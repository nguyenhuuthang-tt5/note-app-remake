import { graphRequest } from './request'

export const folderUtil = async () => {
    const query = `query Folders {
        folders {
          id
          name
        }
    }`
    const payload = {
        query
    }
    const data = await graphRequest(payload)
    return !data ? null : data.folders
}

export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
        addFolder(name: $name) {
          id
          name
        }
      }
    `
    const payload = {
        query,
        variables: {
            name: newFolder.name
        }
    }
    const data = await graphRequest(payload)
    return data
}