import { useState, useEffect } from "react";
import { getDatas } from "../../apis/Archery/getScore";
import { ListItem } from "../ListItem";
import { StyledLists } from "../../styles/List/ListsStyle";
import { StyledContentContainer, StyledMobileContentContainer } from "../../styles/Content/ContentStyle";
import { Mobile, PC } from "../../responsive";
import { Rule } from "../Rule";
import { useStateContext } from "../../Context";
import { StyledRulePopupOpenButton } from "../../styles/Rule/RuleStyle";

interface RankData {
    name: string;
    score: number;
}

export const ArcheryList = () => {
    const {onPopup, setOnPopup} = useStateContext();
    const [data, setData] = useState<Array<object> | null>(null);

    const getArchery = async () => {
        const fetchData:Array<object> = await getDatas();
        setData(fetchData);
    }
    useEffect(() => {
        /**
         * @todo "data" state에 값 불러오기
         */
        if (data === null) {  // 무한 반복 방지
            getArchery();
        }
    }, [data])

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
                        {onPopup ? <Rule game="archery" /> : ""}
                        
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
                        {onPopup ? <Rule game="archery" /> : ""}
                        
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