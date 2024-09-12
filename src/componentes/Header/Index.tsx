import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import { Scroll, Timer, Watch } from 'phosphor-react'

export function Header(){

    return(
       <HeaderContainer>
        <span><Watch size={30} color="#00875F" weight="fill" /></span>

        <nav>
            <NavLink to="/">
            <Timer size={24}/>
        </NavLink>
        
        <NavLink to="/history">
        <Scroll size={24}/>
        </NavLink>
        </nav>
       </HeaderContainer>
    );
}