import pacote from 'pacote'
export const searchPkg = async pkgName => {
  const {_resolved: downloadUrl, description: fileName, author}  = await pacote.manifest(pkgName)

  return {downloadUrl, fileName, author}
}