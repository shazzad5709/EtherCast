import React, { ReactElement, useState } from 'react'

type Props = {}

export default function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0)

  function next() {
    setCurrentStepIdx(i => {
      if(i >= steps.length - 1) return i
      return i + 1
    })
  }

  function back() {
    setCurrentStepIdx(i => {
      if(i <= 0) return i
      return i - 1
    })
  }

  function goto(index: number) {
    setCurrentStepIdx(index)
  }


  return {
    currentStepIdx,
    step: steps[currentStepIdx],
    steps,
    goto,
    next,
    back,
  }
}