// Logging level 
// LOGLEVEL = 1  -- Normal logging
// LOGLEVEL = 5  -- Info logging
// LOGLEVEL = 10 -- Debug logging
export const NORMAL_LOG = 1;
export const INFO_LOG = 5;
export const DEBUG_LOG = 10;
export const ERROR = 0;

const LOGLEVEL = DEBUG_LOG;

export function log( logmsg, loglvl){
    if(loglvl === undefined){
        loglvl = 1;
    }
    if(loglvl <= LOGLEVEL){

        if(loglvl === NORMAL_LOG){
            console.log(logmsg);
        }else if(loglvl === ERROR){
            console.log("ERROR : " + logmsg);
        }else if(loglvl === INFO_LOG){
            console.log("INFO : " + logmsg);
        }else if(loglvl === DEBUG_LOG){
            console.log("DEBUG : " + logmsg);
        }
    }
}
