import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {toggleRange, selectedRanges, getRanges} from './ChosenRangesSlice';
// import allColours from './allColours';

// const StyledRow = styled.div`
// `;

const RangeList = styled.ul`
    align:left;
    list-style-type: none;
    > li {
        text-align:left;
    }
`;


const RangeRow = ({ageRange, isSelected}) => {
    const dispatch = useDispatch();
    const { register } = useForm();
    // const [checked, setChecked] = useState(rangeSelected);

    // useEffect(() => {
    //     setChecked(isSelec)
    // })

    // const onSubmit = data => console.log(data);

    // const handleChange = e => {

    //     console.log(e)
    //     // setChecked(!checked);
    // }

    const handleToggle = (ageRange) => dispatch(toggleRange(ageRange))


    return <form>
        <input  type="checkbox" name="selected" checked={isSelected} ref={register} onChange={() => handleToggle(ageRange)}/><span>{ageRange.replace("_","-")}</span>
    </form>
}



// const NewRangeSelector = () => {
//     const chosenRanges = useSelector(selectedRanges);
//     const chosenAges = chosenRanges.map(range => range.ageRange)
//     const chosenColours = chosenRanges.map(range => range.colour)
//     const colours = allColours.filter(colour => !chosenColours.includes(colour))
//     const ageRanges = useSelector(selectAgeRanges).filter(range => !chosenAges.includes(range));
//     const { register, handleSubmit } = useForm();
//     const dispatch = useDispatch();

//     // if (ageRanges.length === 0 || colours.length === 0) {
//     //     return null;
//     // }
//     const onAdd = data => {
//         dispatch(addRange(data));
//     }



//     return (
//         <StyledRow>
//             <form onSubmit={handleSubmit(onAdd)}>
//                 <select name="ageRange" ref={register}>
//                     {
//                         ageRanges.map(range => <option key={range} value={range} >{range.replace("_","-")}</option>)
//                     }
//                 </select>

//                 <select name="colour" ref={register} >
//                     {
//                         colours.map(colour => <option key={colour} value={colour}>{colour}</option>)
//                     }
//                 </select>
//                 <button>+</button>
//             </form>
//         </StyledRow>
//     )
// }


export const AgeRangePicker = () => {
    const ranges = useSelector(getRanges);
    const chosenRanges = useSelector(selectedRanges);
    const chosenAges = chosenRanges.map(range => range.ageRange)
    const ageRanges = useSelector(selectAgeRanges);

    return (
        <RangeList>
            {
                Object.keys(ranges).map(ageRange => {
                    const {isSelected, colours} = ranges[ageRange];
                    return (
                        <li key={ageRange}><RangeRow {...{ageRange, colours, isSelected}}/></li>
                    )
                })
            }
        </RangeList>
    )

    // if (ageRanges.length === 0 || colours.length === 0) {
    //     return null;
    // }

    // const handleRemove = range => {
    //     dispatch(removeRange(range));
    // }

    // return (
    //     <>
    //         <NewRangeSelector />
    //         {chosenRanges.map((range, i) =>(
    //                 <div key={i}><span>{range.ageRange}</span>-<span>{range.colour}</span><button onClick={() => handleRemove(range)}>-</button></div>
    //         ))}
    //     </>
    // )
}

export default AgeRangePicker;







// import React, {useState} from 'react';
// import { useSelector } from 'react-redux';
// import { selectAgeRanges } from './CasesSlice';
// import { useForm } from 'react-hook-form';
// import styled from 'styled-components';


// // const allColours = [
// //     "aqua","blue",
// //     "navy","purple",
// //     "olive","green",
// //     "lime","yellow",
// //     "fuchsia","red",
// //     "maroon","orange",
// //     "teal","grey",
// //     "silver","black",
// //     "brown", "Chartreuse",
// //     "coral", "DarkMagenta",
// //     "IndianRed"
// // ]




// const RangeList = styled.ul`
//     align:left;
//     list-style-type: none;
//     > li {
//         text-align:left;
//     }
// `;


// const RangeRow = ({range}) => {
//     const { register } = useForm();
//     const [checked, setChecked] = useState(false);

//     // console.log({checked})

//     // const onSubmit = data => console.log(data);

//     const handleChange = e => setChecked(!checked);

//     return <form>
//         <input  type="checkbox" name="selected" defaultChecked={checked} ref={register} onChange={handleChange}/><span>{range.replace("_","-")}</span>
//     </form>
// }


// export const AgeRangeList = ({ onAdd, chosenRanges }) => {
//     // const chosenAges = chosenRanges.map(range => range.ageRange)
//     const ageRanges = useSelector(selectAgeRanges);

//     // console.log({ageRanges})

//     return (
//         <RangeList>
//             {ageRanges.map(range => (
//                 <li key={range}><RangeRow {...{range}}/></li>
//             ))}
//         </RangeList>
//     )



//     // const chosenAges = chosenRanges.map(range => range.ageRange)
//     // const chosenColours = chosenRanges.map(range => range.colour)
//     // const colours = allColours.filter(colour => !chosenColours.includes(colour))
//     // const ageRanges = useSelector(selectAgeRanges).filter(range => !chosenAges.includes(range));
//     // const { register, handleSubmit } = useForm();

//     // if (ageRanges.length === 0 || colours.length === 0) {
//     //     return null;
//     // }

//     // return (
//     //     {chosenAges.map(ageRange => (

//     //     ))}


//     //     <StyledRow>
//     //         <form onSubmit={handleSubmit(onAdd)}>
//     //             <select name="ageRange" ref={register}>
//     //                 {
//     //                     ageRanges.map(range => <option key={range} value={range} >{range}</option>)
//     //                 }
//     //             </select>

//     //             <select name="colour" ref={register} >
//     //                 {
//     //                     colours.map(colour => <option key={colour} value={colour}>{colour}</option>)
//     //                 }
//     //             </select>
//     //             <button>+</button>
//     //         </form>
//     //     </StyledRow>
//     // )
// }

// export default AgeRangeList;
