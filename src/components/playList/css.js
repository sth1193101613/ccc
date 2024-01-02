import styled from 'styled-components'
import { Popup } from 'antd-mobile'

const RestPop = styled(Popup)`
.adm-popup-body{
    background-color:var(--popColor);
    width: 90%;
    left: 50%;
    margin-left: -45%;
    border-radius: 10px 10px 0 0;
    padding: 0 15px;
    .songhead{
        height: 55px;
        line-height: 55px;
        font-size:var(--size16);
        color:var(--whiteColor);
        border-bottom: 1px solid #424040;
    }
    .songlist{
        overflow: scroll;
        height: 100%;
        padding-bottom: 50px;
        .list{
            height:35px;
            line-height:35px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .conent{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
                .sname{
                    font-size:var(--size14);
                }
                .arname{
                    font-size:var(--size12);
                }
            }
            .clear{
                width: 20px;
                height: 20px;
                display: block;
            }
        }
    }
}
`
export {
    RestPop
}