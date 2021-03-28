import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { selectAgeRanges } from './CasesSlice';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';


// const allColours = [
//     "aqua","blue",
//     "navy","purple",
//     "olive","green",
//     "lime","yellow",
//     "fuchsia","red",
//     "maroon","orange",
//     "teal","grey",
//     "silver","black",
//     "brown", "Chartreuse",
//     "coral", "DarkMagenta",
//     "IndianRed"
// ]




const RangeList = styled.ul`
    align:left;
    list-style-type: none;
    > li {
        text-align:left;
    }
`;


const RangeRow = ({range}) => {
    const { register } = useForm();
    const [checked, setChecked] = useState(false);

    // console.log({checked})

    // const onSubmit = data => console.log(data);

    const handleChange = e => setChecked(!checked);

    return <form>
        <input  type="checkbox" name="selected" defaultChecked={checked} ref={register} onChange={handleChange}/><span>{range.replace("_","-")}</span>
    </form>
}


export const AgeRangeList = ({ onAdd, chosenRanges }) => {
    // const chosenAges = chosenRanges.map(range => range.ageRange)
    const ageRanges = useSelector(selectAgeRanges);

    // console.log({ageRanges})

    return (
        <RangeList>
            {ageRanges.map(range => (
                <li key={range}><RangeRow {...{range}}/></li>
            ))}
        </RangeList>
    )



    // const chosenAges = chosenRanges.map(range => range.ageRange)
    // const chosenColours = chosenRanges.map(range => range.colour)
    // const colours = allColours.filter(colour => !chosenColours.includes(colour))
    // const ageRanges = useSelector(selectAgeRanges).filter(range => !chosenAges.includes(range));
    // const { register, handleSubmit } = useForm();

    // if (ageRanges.length === 0 || colours.length === 0) {
    //     return null;
    // }

    // return (
    //     {chosenAges.map(ageRange => (

    //     ))}


    //     <StyledRow>
    //         <form onSubmit={handleSubmit(onAdd)}>
    //             <select name="ageRange" ref={register}>
    //                 {
    //                     ageRanges.map(range => <option key={range} value={range} >{range}</option>)
    //                 }
    //             </select>

    //             <select name="colour" ref={register} >
    //                 {
    //                     colours.map(colour => <option key={colour} value={colour}>{colour}</option>)
    //                 }
    //             </select>
    //             <button>+</button>
    //         </form>
    //     </StyledRow>
    // )
}

export default AgeRangeList;
