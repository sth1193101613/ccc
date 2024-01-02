import styled from 'styled-components'
import { RenderContainer, RenderTitle } from '/@/assets/style/index'
const SongRerder = styled(RenderContainer)``
const CardTitle = styled(RenderTitle)``
const CardWarp = styled.div`
position: relative;
white-space: nowrap;
overflow: hidden;
.slidebox{
    display: inline-block;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    .itemcont{
        display: inline-block;
        backface-visibility: hidden;
        .songitem{
            display:flex;
            margin-bottom:8px;
            align-items: center;
            .picbox{
                position: relative;
                .picUrl{
                    width:55px;
                    height:55px;
                    border-radius:5px;
                }
            }
            .info{
                margin-left:10px;
                width:100%;
                line-height: 20px;
                .songname{
                    width:80%;
                    font-size: var(--size12);
                    color:#fff;
                    overflow:hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow:ellipsis;
                }
                .art{
                    font-size: 10px;
                    color:rgb(182,182,182);
                    
                }
                .reason{
                    color:#db1c1c;
                    font-size: 10px;
                    margin-right: 10px;
                }
            }
        }
        
    }
}

`
export {
    SongRerder,
    CardTitle,
    CardWarp
}