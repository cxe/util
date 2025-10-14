/**
 * spelling.mjs
 * 
 * - NATO Phonetic Alphabet Encoder/Decoder
 *     Provides bidirectional conversion between ASCII text and the NATO phonetic
 *     alphabet (including digits and punctuation). Case-sensitive output with
 *     optional text-to-speech pause markers and customizable separators.
 */

const NATO={
A:'ALFA',B:'BRAVO',C:'CHARLIE',D:'DELTA',E:'ECHO',F:'FOXTROT',G:'GOLF',H:'HOTEL',I:'INDIA',J:'JULIETT',K:'KILO',L:'LIMA',M:'MIKE',N:'NOVEMBER',O:'OSCAR',P:'PAPA',Q:'QUEBEC',R:'ROMEO',S:'SIERRA',T:'TANGO',U:'UNIFORM',V:'VICTOR',W:'WHISKEY',X:'XRAY',Y:'YANKEE',Z:'ZULU',
0:'ZERO',1:'ONE',2:'TWO',3:'THREE',4:'FOUR',5:'FIVE',6:'SIX',7:'SEVEN',8:'EIGHT',9:'NINE',
'.':'FULL STOP',',':'COMMA','?':'QUESTION MARK','!':'EXCLAMATION MARK','-':'DASH','/':'SLASH','\\':'BACKSLASH','_':'UNDERSCORE',' ':'SPACE','@':'AT','#':'HASH','$':'DOLLAR','%':'PERCENT','&':'AMPERSAND','*':'ASTERISK','+':'PLUS','=':'EQUALS',':':'COLON',';':'SEMICOLON','"':'QUOTE',"'":'APOSTROPHE','(':'LEFT PARENTHESIS',')':'RIGHT PARENTHESIS','[':'LEFT BRACKET',']':'RIGHT BRACKET','{':'LEFT BRACE','}':'RIGHT BRACE','<':'LESS THAN','>':'GREATER THAN','|':'PIPE','^':'CARET','~':'TILDE','`':'BACKTICK'
};

const NATO_REV=Object.fromEntries(Object.entries(NATO).map(([k,v])=>[v.toUpperCase(),k]));

export const natoEncode=(t,o={})=>{
  const{preserveCase=true,separator=' ',speech=false}=o,p=speech?"<break time='200ms'/>":'';
  return[...t].map(c=>{
    const w=NATO[c.toUpperCase()];
    if(!w)return c;
    const a=preserveCase&&c!==c.toUpperCase()?w[0]+w.slice(1).toLowerCase():w;
    return speech?a+p:a;
  }).join(separator);
};

export const natoDecode=p=>p.replace(/<break[^>]*>/g,' ').split(/\s+/).map(w=>NATO_REV[w.toUpperCase()]||w).join('');
