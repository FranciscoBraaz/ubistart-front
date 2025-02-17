function cepMask(value: string) {
  const cleanValue = value.replace(/\D/g, '')
  if (cleanValue.length <= 5) {
    return cleanValue
  }
  return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`
}

const numberNotAllow = (value: string) => {
  return value.replace(/\d/g, '')
}

function setMask(value: string, mask: string) {
  switch (mask) {
    case 'cep':
      return cepMask(value)
    case 'numberNotAllow':
      return numberNotAllow(value)
    default:
      return value
  }
}

export { setMask, cepMask }
