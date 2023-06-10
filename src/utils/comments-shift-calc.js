export default function commentsShiftCalc(shift, lvl, maxLvl=10) {

  if(lvl > maxLvl) {
    return shift * maxLvl
  }
  else {
    return shift * lvl
  }
  
}