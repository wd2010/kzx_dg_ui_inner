import pacote from 'pacote'
import {app} from 'electron';
import path from 'path';

const downloadPath = fileName => path.join(app.getPath("downloads"), fileName) 

const opts = {
  registry: 'http://nexus.rd.citicbank.com/repository/npm-group'
}

export const searchPkg = async pkgName => {
  const {_resolved: downloadUrl, description: fileName, author}  = await pacote.manifest(pkgName, opts)

  return {downloadUrl, fileName, author}
}

export const downloadPkg = async (pkgName, fileName) => {

  return await pacote.extract(pkgName, downloadPath(fileName), opts)
}