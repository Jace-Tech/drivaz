import { SHOW_LOGS } from "../constants/Global"


export const getSubName = (name: string) => {
  const parts = name.split(" ")
  if(parts.length < 2) return name.slice(0, 2)
  return parts.map(name => name[0].toUpperCase()).join("")
}

export const except = (obj: any, ...unwanted: any[]) => {
  const newObj = {...obj}
  for (let key in newObj) {
    if(unwanted.includes(key)) delete newObj[key]
  }
  return newObj
}

export const splitWords = (sentence: string, length: number = 1): string => {
  const words = sentence.split(" ")
  if(words.length < 2) return sentence

  return words.slice(0, length).join(" ")
}

export const formatDate = (date: string, format: "short" | "long" = "short") => {
  const dateObj = new Date(Date.parse(date))

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const shortMonths = months.map(month => month.slice(0, 3))

  if(format === "short") return `${dateObj?.getDate?.()} ${shortMonths[dateObj?.getMonth?.()]}, ${dateObj?.getFullYear?.()}`
  return `${dateObj?.getDate?.()} ${months[dateObj?.getMonth?.()]}, ${dateObj?.getFullYear?.()}` 
}


export const logger = (...args: any[]) => SHOW_LOGS && console.log(...args)

export const json = (obj: any) => JSON.stringify(obj, null, 4)