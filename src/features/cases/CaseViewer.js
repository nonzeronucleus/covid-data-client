// import React, { useEffect } from 'react';
// import Chart from './Chart';
// import { useSelector } from 'react-redux';
// import { selectAgeRanges } from './CasesSlice';
// import { useArray } from 'react-hanger';
// import AgeRangeList from './AgeRangeList';
// // import AgeRangePicker from './AgeRangePicker';
// import styled from 'styled-components';

// const RangePickerTile = styled.div`
//     grid-area:selection;
//     // background-color:red;
//     width:100%;
// `;


// const ChartTile = styled.div`
//     grid-area:chart;
//     // background-color:blue;
// `;


// export const CaseViewer = () => {
//     const ageRanges = useSelector(selectAgeRanges);
//     // const [chosenRange, setChosenRange] = useState("");
//     const ranges = useArray([]);
//     const r = useSelector()

//     useEffect(() => {
//         if (ageRanges.length > 0) setChosenRange(ageRanges[0])
//     }, [ageRanges])

//     const onAdd = data => {
//         ranges.add(data);

//     }

//     const handleRemove = index => {
//         ranges.removeIndex(index)
//         console.log(ranges.value)
//     }

//     return (
//         <>
//             <AgeRangeList  {...{ onAdd, chosenRanges:ranges.value }} />
//             {ranges.value.map((range, i) =>(
//                 <div key={i}><span>{range.ageRange}</span>-<span>{range.colour}</span><button onClick={() => handleRemove(i)}>-</button></div>
//             ))}
//         </>
//     )
// }
