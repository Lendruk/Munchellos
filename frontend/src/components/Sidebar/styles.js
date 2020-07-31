import styled from 'styled-components';

export const Container = styled.div`
    background: #044862;
    width: 320px;
    display: flex;
    align-items: center;
    flex-direction: column;
    -webkit-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
    box-shadow: 7px 7px 19px -8px rgba(0,0,0,0.75);
`;

export const SidebarOption = styled.div`
    padding: 10px 0px;
    font-size: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    user-select: none;
    cursor: pointer;
    color: white;
    min-height: 40px;
    color: ${props => props.isActive ? "#3C4D5B" : "white" };
    background: ${props => props.isActive ? "#DADFCF": "none" };

    div {
        padding: 0px 20px;
    }

    span {
        margin-right: 20px;
    }

    &:hover {
        background: #EFF6E0;
        color: #4C5760;
    }
`;

export const ParentSidebarOption = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    align-items: center;
    display: flex;
    width: 100%;
    user-select: none;
    cursor: pointer;
    color: white;
    min-height: 40px;
    span {
        margin-right: 20px;
    }
`;

export const ChildOption = styled.div`
    padding-left: 70px;
    font-size: 20px;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    color: white;
    min-height: 40px;

    &:hover {
        background: #EFF6E0;
        color: #4C5760;
    }
`;