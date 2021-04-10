import styled from 'styled-components';

export const Radio = styled.label`
    display: inline-block;
    position: relative;
    padding-left: 25px;
    // margin-bottom: 10px;
    cursor: pointer;
    font-size: 18px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    // border-width:1px;
    // border-color:black;
    // border-style:solid;
    // background-color:red;
    padding-top:5px;
    padding-bottom:5px;

    > input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:checked + span {
            background-color:green;
            padding:-20px;
        }
    }

    //
    > span {
        position: absolute;
        top: 10;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #eee;
        border-radius: 50%;
        :after {
            content: "";
            position: absolute;
            display: none;
            top: 9px;
            left: 9px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
        }
    }

    :after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }

    padding-right:40px;
`;
export const Toggle = styled.fieldset`
    margin:6px;
`;
