const SHOW_MESSAGE = true

export const generateRandNumber = (len: number = 3) => Math.floor(Math.random() * (10 ** (len - 1))) + (10 ** (len - 1))


export const logger = (...message: unknown[]) => SHOW_MESSAGE && console.log(...message)


export const except = (obj: any, ...props: string[]) => {
  props.forEach(prop => {
    if(prop in obj) delete obj[prop]
  }) 
  return obj
}