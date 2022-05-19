import { Credit, MinPath } from "../types/ITracker"
import Credits from "./credits";
import Emotions from "./emotions";
import { formatDate } from "./pokemon-thumbnail";
import SpritePreview from "./sprite-preview";
import mappedActionsFile from '../mappedActions.json'

const mappedActions = mappedActionsFile as {[key: string]: string}

export default function PokemonInformations(props:{
    portraitFiles: number[],
    portraitCredit: Credit,
    spriteFiles: number[],
    spriteCredit: Credit,
    infoKey: string,
    spriteModified: string,
    portraitModified: string
    }){
    const portraitDate = props.portraitModified !== '' ? new Date(props.portraitModified): undefined;
    const spriteDate = props.spriteModified !== '' ? new Date(props.spriteModified): undefined;
    return <div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <h4 style={{textAlign:'left'}}>Emotions</h4>
                <p style={{fontSize: '0.6em', margin: '0px'}}>{getLastModification(portraitDate)}</p>
            </div>
            <Credits primary={props.portraitCredit[MinPath.PRIMARY]} secondary={props.portraitCredit[MinPath.SECONDARY]}/>
        </div>
        {Object.keys(props.portraitFiles).length !== 0 ? <Emotions infoKey={props.infoKey} emotions={props.portraitFiles}/>: <p>No portraits available for now.</p>}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <h4 style={{textAlign:'left'}}>Sprites</h4>
                <p style={{fontSize: '0.6em', margin: '0px'}}>{getLastModification(spriteDate)}</p>
            </div>
            <Credits primary={props.spriteCredit[MinPath.PRIMARY]} secondary={props.spriteCredit[MinPath.SECONDARY]}/>
        </div>
        {Object.keys(props.spriteFiles).length !== 0 ? <div  style={{display:'flex', flexWrap:'wrap'}}>
            {props.spriteFiles.map(
                k => <SpritePreview key={k} infoKey={props.infoKey} action={mappedActions[k.toString()]}/>
            )}
        </div>: <p>No sprites available for now.</p>}

    </div>
}

function getLastModification(t: Date | undefined){
    if(t){
        return 'Modified at ' + formatDate(t.getTime());
    }
    return '';
}