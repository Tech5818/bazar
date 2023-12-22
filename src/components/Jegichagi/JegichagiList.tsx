import { useState, useEffect } from "react";
import { getDatas } from "../../apis/Jegichagi/getScore";
import { ListItem } from "../ListItem";
import { StyledLists } from "../../styles/List/ListsStyle";
import { StyledContentContainer, StyledMobileContentContainer } from "../../styles/Content/ContentStyle";
import { Mobile, PC } from "../../responsive";
import { StyledRulePopupOpenButton } from "../../styles/Rule/RuleStyle";
import { Rule } from "../Rule";
import { useStateContext } from "../../Context";
import { useNavigate } from "react-router-dom";

interface RankData {
    name: string;
    score: number;
}

export const JegichagiList = () => {
    const navigate = useNavigate();
    const {onPopup, setOnPopup} = useStateContext();
    const [data, setData] = useState<Array<object> | null>(null);

    const getJegichagi = async () => {
        const fetchData:Array<object> = await getDatas();
        setData(fetchData);
    }
    useEffect(() => {
        /**
         * @todo "data" state에 값 불러오기
         */
        if (data === null) {  // 무한 반복 방지
            getJegichagi();
        }
    }, [data])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const preventClose = (e:BeforeUnloadEvent) => {
        e.preventDefault();
        navigate("/");
    }
    useEffect(() => {
        window.addEventListener("beforeunload", preventClose)

        return window.removeEventListener("beforeunload", preventClose);
    },[preventClose])
    const handleOpenPopup = () => {
        setOnPopup(true);
    }

    return(
        <>
            <PC>
                <StyledContentContainer>
                    <StyledLists>
                        <StyledRulePopupOpenButton onClick={handleOpenPopup}>
                            룰 설명
                        </StyledRulePopupOpenButton>
                        {onPopup ? <Rule game="jegichagi" /> : ""}
                        
                        {data?.filter((element): element is RankData => {
                            return typeof (element as RankData).name === 'string' && typeof (element as RankData).score === 'number'; 
                        }).sort((a,b) => b.score - a.score).map((element, idx) => (
                            <ListItem name={element.name} score={element.score} key={idx} rank={idx + 1} />
                        ))}
                    </StyledLists>
                </StyledContentContainer>
            </PC>
            <Mobile>
                <StyledMobileContentContainer>
                    <StyledLists>
                        <StyledRulePopupOpenButton onClick={handleOpenPopup}>
                            룰 설명
                        </StyledRulePopupOpenButton>
                        {onPopup ? <Rule game="jegichagi" /> : ""}
                        
                        {data?.filter((element): element is RankData => {
                            return typeof (element as RankData).name === 'string' && typeof (element as RankData).score === 'number'; 
                        }).sort((a,b) => b.score - a.score).map((element, idx) => (
                            <ListItem name={element.name} score={element.score} key={idx} rank={idx + 1} />
                        ))}
                    </StyledLists>
                </StyledMobileContentContainer>
            </Mobile>
        </>
    )
}