/**
 * spelling.mjs
 * 
 * - NATO/ICAO Phonetic Alphabet Encoder/Decoder (optimized for EN, FR, ES speakers)
 *   Provides bidirectional conversion between ASCII text and the ICAO phonetic
 *   alphabet (including digits and punctuation). Case-sensitive output with
 *   optional text-to-speech pause markers and customizable separators.
 */

const ICAO={
A:'ALFA',B:'BRAVO',C:'CHARLIE',D:'DELTA',E:'ECHO',F:'FOXTROT',G:'GOLF',H:'HOTEL',I:'INDIA',J:'JULIETT',K:'KILO',L:'LIMA',M:'MIKE',N:'NOVEMBER',O:'OSCAR',P:'PAPA',Q:'QUEBEC',R:'ROMEO',S:'SIERRA',T:'TANGO',U:'UNIFORM',V:'VICTOR',W:'WHISKEY',X:'XRAY',Y:'YANKEE',Z:'ZULU',
0:'ZERO',1:'ONE',2:'TWO',3:'THREE',4:'FOUR',5:'FIVE',6:'SIX',7:'SEVEN',8:'EIGHT',9:'NINE',
'.':'FULL STOP',',':'COMMA','?':'QUESTION MARK','!':'EXCLAMATION MARK','-':'DASH','/':'SLASH','\\':'BACKSLASH','_':'UNDERSCORE',' ':'SPACE','@':'AT','#':'HASH','$':'DOLLAR','%':'PERCENT','&':'AMPERSAND','*':'ASTERISK','+':'PLUS','=':'EQUALS',':':'COLON',';':'SEMICOLON','"':'QUOTE',"'":'APOSTROPHE','(':'LEFT PARENTHESIS',')':'RIGHT PARENTHESIS','[':'LEFT BRACKET',']':'RIGHT BRACKET','{':'LEFT BRACE','}':'RIGHT BRACE','<':'LESS THAN','>':'GREATER THAN','|':'PIPE','^':'CARET','~':'TILDE','`':'BACKTICK'
};

const ICAO_REV = Object.create(null);
for (const [k,v] of Object.entries(ICAO)) ICAO_REV[v.toUpperCase()] = k;

export const icaoEncode = (t, o={}) => {
  const { preserveCase=true, separator=' ', speech=false } = o;
  const pause = speech ? "<break time='200ms'/>" : '';
  const out = [];
  for (const c of t) {
    const w = ICAO[c.toUpperCase()];
    if (!w) { out.push(c); continue; }
    let a = w;
    if (preserveCase && c !== c.toUpperCase())
      a = w[0] + w.slice(1).toLowerCase();
    if (speech) a += pause;
    out.push(a);
  }
  return out.join(separator);
};

export const icaoDecode = p => {
  if (p.includes('<break')) p = p.replace(/<break[^>]*>/g,' ');
  return p.split(/\s+/).map(w => ICAO_REV[w.toUpperCase()] || w).join('');
};
