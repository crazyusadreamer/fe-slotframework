import gsap from 'gsap'

export default new (class TextUtilities {
  
  animateCounting(
    textObject: any,
    from: number,
    to: number,
    duration: number,
    easing: string,
    fontSizeStart: number,
    fontSizeEnd: number,
    toFixed: number,
    onComplete: any = null,
    onUpdate: any = null
  ) {
    const amountObj = { value: from }
    const fontObj = { value: fontSizeStart }

    textObject.text = from.toFixed(toFixed)

    gsap.to(fontObj, duration, {value: fontSizeEnd, ease: easing,
      onUpdate: () => {
        textObject.fontSize = fontObj.value
      },
    })

    gsap.to(amountObj, duration, {value: to, ease: easing,
      onUpdate: () => {
        textObject.text = amountObj.value.toFixed(toFixed)
        if(onUpdate) onUpdate(amountObj.value)
      },
      onComplete: () => {
        textObject.text = amountObj.value.toFixed(toFixed)
        if(onUpdate) onUpdate(amountObj.value)

        if(onComplete) onComplete()
      },
    })
  }

})()
