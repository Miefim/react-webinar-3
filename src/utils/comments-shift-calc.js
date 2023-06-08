export default function commentsShiftCalc(shift, lvl, maxLvl=10) {

   return shift * (lvl % maxLvl)
   
}