import * as PIXI from 'pixi.js'
import gsap from 'gsap'

export class Utilities {
  public static applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
            Object.create(null)
        )
      })
    })
  }

  public static randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  public static getRandomInt(min: number, max: number) {
    return Math.round(this.randomNumber(min, max))
  }

  public static getUrlParam(parameter: any, defaultvalue: any) {
    function getUrlVars() {
      let vars: any = {}
      let href = decodeURI(window.location.href)
      //@ts-ignore
      //prettier-ignore
      let parts: string = href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m: string, key: any, value: any) {
          vars[key] = decodeURIComponent(value)
        }
      )
      return vars
    }

    let urlparameter = defaultvalue
    if (window.location.href.indexOf(parameter) > -1) {
      urlparameter = getUrlVars()[parameter]
    }
    return urlparameter
  }

  public static searchParam(parameter: any) {
    var ext_params = {}
    let href = decodeURI(window.location.href)
    var searchParams = new URLSearchParams(href)
    for(var pair of searchParams.entries()) {
      if(pair[0].indexOf(parameter) != -1) {
        let field = pair[0].substring(pair[0].lastIndexOf('[') + 1, pair[0].lastIndexOf(']'))
        //@ts-ignore
        ext_params[field] = pair[1]
      }
    }
    return ext_params
  }

  public static async fadeIn(target: PIXI.Container, time: number): Promise<void> {
    return new Promise((resolve, reject) => {
      gsap.to(target, time, {alpha: 1,
        onComplete: () => {
          resolve()
        },
      })
    })
  }

  public static async fadeOut(target: PIXI.DisplayObject, time: number): Promise<void> {
    return new Promise((resolve, reject) => {
      gsap.to(target, time, {alpha: 0,
        onComplete: () => {
          resolve()
        },
      })
    })
  }

  public static sleep(ms: number): Promise<void> {
    return new Promise((accept: any) => {
      setTimeout(() => {
        accept()
      }, ms)
    })
  }

  public static radToDeg(rad: number): number {
    return (rad * 180) / Math.PI
  }

  public static degToRad(deg: number): number {
    return (deg * Math.PI) / 180
  }

  public static a2hex(str: string): string {
    var hex = ''
    for (var i = 0, l = str.length; i < l; i++) {
      var hexx = Number(str.charCodeAt(i)).toString(16)
      hex += (hexx.length > 1 && hexx) || '0' + hexx
    }
    return hex
  }

  public static hexToChar(str: string): string {
    return str.replace(/&#([a-zA-Z0-9]+)/g, function (match, group1) {
      return String.fromCharCode(parseInt('0' + group1))
    })
  }

  public static shake(
    displayObject: any,
    shakes: number = 10,
    speed: number = 0.02,
    amplitudeX: number = 2,
    amplitudeY: number = 2,
    amplitudeRotation: number = 2
  ): any {
    const tlNumbers = gsap.timeline()
    let xx = displayObject.x
    let yy = displayObject.y
    let startAngle = displayObject.angle
    for (let i = 0; i < shakes; i++) {
      tlNumbers.to(displayObject, speed, {
        x: displayObject.x + Utilities.getRandomInt(-amplitudeX, amplitudeX),
        y: displayObject.y + Utilities.getRandomInt(-amplitudeY, amplitudeY),
        angle:
          displayObject.angle +
          Utilities.getRandomInt(-amplitudeRotation, amplitudeRotation),
        onComplete: () => {
          displayObject.angle = startAngle
          displayObject.x = xx
          displayObject.y = yy
        },
      })
    }
    return tlNumbers
  }
}
