const agesToFilterOut = ["unassigned", "60+", "00-59"]

const filterAgeRanges = list => list.filter(({age}) => !agesToFilterOut.includes(age.replace("_","-")))

export default filterAgeRanges
