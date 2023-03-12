const replaceRegex = /([.[\]#\s])/g;

export function generateInputId(storePath: string) {
  return `Input_${storePath.replace(replaceRegex, '_').toLowerCase()}`;
}
