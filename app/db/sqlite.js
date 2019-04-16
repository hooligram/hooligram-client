import SQLite from 'react-native-sqlite-storage'

let instance

if (__DEV__) {
  SQLite.DEBUG(true)
}

SQLite.enablePromise(true)
SQLite.openDatabase({ name: 'hooligram-v2-client.db' })
  .then((db) => {
    instance = db
  })
  .then(() => {
    instance.executeSql(`
      CREATE TABLE IF NOT EXISTS contact (
        sid TEXT PRIMARY KEY,
        status INTEGER DEFAULT 0,
        name TEXT
      );
    `)
  })
  .then(() => {
    instance.executeSql(`
      CREATE TABLE IF NOT EXISTS message_group (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        date_created TEXT NOT NULL
      );
    `)
  })
  .then(() => {
    instance.executeSql(`
      CREATE TABLE IF NOT EXISTS message_group_contact (
        message_group_id INTEGER NOT NULL,
        contact_sid TEXT NOT NULL,
        PRIMARY KEY ( message_group_id, contact_sid ),
        FOREIGN KEY ( message_group_id ) REFERENCES message_group ( id )
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        FOREIGN KEY ( contact_sid ) REFERENCES contact ( sid )
      );
    `)
  })
  .then(() => {
    instance.executeSql(`
      CREATE TABLE IF NOT EXISTS message (
        id INTEGER PRIMARY KEY,
        content TEXT NOT NULL,
        date_created TEXT NOT NULL,
        message_group_id INTEGER NOT NULL,
        sender_sid TEXT NOT NULL,
        FOREIGN KEY ( message_group_id ) REFERENCES message_group ( id ),
        FOREIGN KEY ( sender_sid ) REFERENCES contact ( sid )
      );
    `)
  })
  .then(() => {
    instance.executeSql(`
      CREATE TABLE IF NOT EXISTS direct_message (
        message_group_id INTEGER,
        recipient_sid TEXT,
        PRIMARY KEY ( message_group_id, recipient_sid ),
        FOREIGN KEY ( message_group_id ) REFERENCES message_group ( id ),
        FOREIGN KEY ( recipient_sid ) REFERENCES contact ( sid )
      );
    `)
  })
  .catch((err) => {
    console.log('error creating table. ', err.toString())
  })

////////////
// CREATE //
////////////

export const createContact = async (sid) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('INSERT OR IGNORE INTO contact ( sid ) VALUES ( ? );', [sid])
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('error creating contact.', err.toString())
    })
}

export const createDirectMessage = async (messageGroupId, recipientSid) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    INSERT OR IGNORE INTO direct_message ( message_group_id, recipient_sid )
    VALUES ( ?, ? );
  `, [messageGroupId, recipientSid])
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log('error creating direct message.', err.toString())
      })
}

export const createMessage = async (id, content, dateCreated, messageGroupId, senderSid) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    INSERT OR REPLACE INTO message ( id, content, date_created, message_group_id, sender_sid )
    VALUES ( ?, ?, ?, ?, ? );
  `, [id, content, dateCreated, messageGroupId, senderSid])
}

export const createMessageGroup = async (id, name, dateCreated, contactSids) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance
    .transaction((tx) => {
      tx.executeSql(`
        INSERT OR REPLACE INTO message_group ( id, name, date_created ) VALUES ( ?, ?, ? );
      `, [id, name, dateCreated])

      contactSids.forEach((sid) => {
        tx.executeSql('INSERT OR IGNORE INTO contact ( sid ) VALUES ( ? );', [sid])
        tx.executeSql(`
          INSERT OR IGNORE INTO message_group_contact ( message_group_id, contact_sid )
          VALUES ( ?, ? );
        `, [id, sid])
      })
    })
    .catch((err) => {
      console.log('error creating message group.' + err.toString())
    })
}

//////////
// READ //
//////////

export const readContact = async (contactSid) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('SELECT sid, status, name FROM contact WHERE sid = ?;', [contactSid])
    .then(([results]) => {
      if (results.rows.length < 1) return null

      return results.rows.item(0)
    })
}

export const readContactDirectMessageGroupId = async (contactId) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    SELECT message_group_id FROM direct_message WHERE recipient_sid = ?;
  `, [contactId])
    .then(([results]) => {
      if (results.rows.length < 1) return 0

      return results.rows.item(0).message_group_id
    })
}

export const readContacts = async () => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('SELECT sid, status, name FROM contact;')
    .then(([results]) => {
      const contacts = []

      for (let i = 0; i < results.rows.length; i++) {
        contacts.push(results.rows.item(i))
      }

      return contacts
    })
    .catch((err) => {
      console.log('error reading contacts.', err.toString())
    })
}

export const readDirectMessageGroupRecipientSid = async (messageGroupId) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    SELECT recipient_sid FROM direct_message WHERE message_group_id = ?;
  `, [messageGroupId])
    .then(([results]) => {
      if (results.rows.length < 1) return ''

      return results.rows.item(0).recipient_sid
    })
}

export const readIsDirectMessage = async (messageGroupId) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    SELECT COUNT(*) AS count FROM direct_message WHERE message_group_id = ?;
  `, [messageGroupId])
    .then(([results]) => {
      return results.rows.item(0).count > 0
    })
}

export const readMessageGroup = async (groupId) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    SELECT id, name, date_created FROM message_group WHERE id = ?;
  `, [groupId])
    .then(([result]) => {
      if (result.rows.length < 1) return {}

      return result.rows.item(0)
    })
}

export const readMessageGroupContacts = async (messageGroupId) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    SELECT contact_sid FROM message_group_contact WHERE message_group_id = ?;
  `, [messageGroupId])
    .then(([results]) => {
      const contactSids = []

      for (let i = 0; i < results.rows.length; i++) {
        contactSids.push(results.rows.item(i).contact_sid)
      }

      return contactSids
    })
}

export const readMessageGroups = async () => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance
    .executeSql('SELECT id, name, date_created FROM message_group;')
    .then(([results]) => {
      const messageGroups = []

      for (let i = 0; i < results.rows.length; i++) {
        messageGroups.push(results.rows.item(i))
      }

      return messageGroups
    })
}

export const readMessages = async (groupId) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql(`
    SELECT id, content, date_created, message_group_id, sender_sid
    FROM message
    WHERE message_group_id = ?;
  `, [groupId])
    .then(([results]) => {
      const messages = []

      for (let i =0; i < results.rows.length; i++) {
        messages.push(results.rows.item(i))
      }

      return messages
    })
}

////////////
// UPDATE //
////////////

export const updateContactName = async (sid, name) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('UPDATE contact SET name = ? WHERE sid = ?;', [name, sid])
}

export const updateContactStatus = async (sid, status = 0) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('UPDATE contact SET status = ? WHERE sid = ?;', [status, sid])
}

////////////
// DELETE //
////////////

export const deleteMessageGroup = async (id) => {
  if (!instance) return Promise.reject(new Error('db instance error'))

  return instance.executeSql('DELETE FROM message_group WHERE id = ?;', [id])
}
