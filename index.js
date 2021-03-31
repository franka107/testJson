const fetch = require("node-fetch");
const getStaffUserList = 'https://s5fa2b530b934af000826dd26.projects.ideascloud.io/services/getStaffUsersList/execute'
const encryptPassword = 'https://s5fa2b530b934af000826dd26.projects.ideascloud.io/services/encryptPassword/execute'
const getCredentials =  'https://s5fa2b530b934af000826dd26.projects.ideascloud.io/services/getCredentials/execute'
const encryptNormalPassword = 'https://s5fa2b530b934af000826dd26.projects.ideascloud.io/services/encryptPasswordNormalUser/execute'

async function fetchUsers() {
  const response = await fetch(getStaffUserList)
  return await response.json()
}

async function fetchNormalUsersCredentials() {
  const response = await fetch(getCredentials)
  return await response.json()
}

async function encryptStaffUsersPassword() {
  let staffUsers = await fetchUsers()
  staffUsers.forEach(async user => {
      const response =  await fetch(encryptPassword, {
        method: 'POST',
        body: JSON.stringify({
          _id: user._id,
          passwordNoEncrypted: user.password
        })
      })
  });
}

async function encryptNormalUsersPassword() {
  let credentials = await fetchNormalUsersCredentials()
  credentials.forEach(async credential => {
      const response =  await fetch(encryptNormalPassword, {
        method: 'POST',
        body: JSON.stringify({
          _id: credential._id,
          passwordNoEncrypted: credential.credentials.password
        })
      })
      console.log(response)
      console.log('---------------------------------')
  });
}

async function main() {
  // encryptNormalUsersPassword()
}

main()