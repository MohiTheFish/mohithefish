(this.webpackJsonpmohithefish=this.webpackJsonpmohithefish||[]).push([[0],{114:function(e,t,a){e.exports=a(170)},119:function(e,t,a){},125:function(e,t,a){},126:function(e,t,a){},156:function(e,t){},159:function(e,t,a){},160:function(e,t,a){},161:function(e,t,a){},163:function(e,t,a){},164:function(e,t,a){},165:function(e,t,a){},166:function(e,t,a){},167:function(e,t,a){},168:function(e,t,a){},169:function(e,t,a){},170:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(7),c=a.n(s),i=(a(119),a(30)),o=a(12),l=a(13),m=a(68),u=a.n(m),d=a(95),p=a(15);a(125);function E(){return r.a.createElement("div",{className:"lds-ripple"},r.a.createElement("div",null),r.a.createElement("div",null))}function h(){var e=Object(n.useState)(0),t=Object(p.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)(""),i=Object(p.a)(c,2),o=i[0],l=i[1],m=Object(n.useState)(1),h=Object(p.a)(m,2),g=h[0],f=h[1],y=Object(n.useState)(""),v=Object(p.a)(y,2),b=v[0],O=v[1];Object(n.useEffect)((function(){function e(){return(e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://cors-anywhere.herokuapp.com/https://randomfox.ca/floof/?ref=apilist.fun",{method:"GET",headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){O(e.image)}));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}document.title="MohiTheFish",function(){e.apply(this,arguments)}()}),[]);return r.a.createElement("div",null,"This page is being used to test new features.",r.a.createElement("div",null,r.a.createElement("p",null,"You clicked ",a," times"),r.a.createElement("button",{onClick:function(){return s(a+1)}},"Click me")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",value:o,onChange:function(e){l(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("h1",null,"Pick a movie"),r.a.createElement("select",{value:g,onChange:function(e){return f(e.target.value)}},r.a.createElement("option",{value:"1"},"1"),r.a.createElement("option",{value:"2"},"2"),r.a.createElement("option",{value:"3"},"3"),r.a.createElement("option",{value:"4"},"4"),r.a.createElement("option",{value:"5"},"5"),r.a.createElement("option",{value:"6"},"6"))),""===b?r.a.createElement(E,null):r.a.createElement("img",{src:b,alt:"A fox"}))}a(126);function g(){return r.a.createElement("div",{className:"main-page-wrapper"},r.a.createElement("div",{className:"intro"},r.a.createElement("h1",null,"Muhammed Imran"),r.a.createElement("h2",null,"MohiTheFish"),r.a.createElement(i.b,{to:"/games"},"Click me to see some games.")))}var f=a(212),y=a(207),v=a(35),b=a(10);var O=a(216),S=sessionStorage;var I={username:"",gamename:"",userId:function(){var e=S.getItem("userId");return e||(e=Object(O.a)(),S.setItem("userId",e),e)}()};var N="create",_="join",T="created",C="joined";function w(e){return{type:"SET_IS_CONNECTED",isConnected:e}}function L(e){return{type:"ADD_NAME_SPYFALL",data:e}}function j(e){return{type:"REMOVE_NAME_SPYFALL",data:e}}var P="true"===Object({NODE_ENV:"production",PUBLIC_URL:"/mohithefish",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_DESIGN?{isConnected:!0,selectedChoice:T,myIndex:-1,isLoadingRoom:!1,numPlayers:4,host:"Mohitheifhs",members:["other guy","nobody","zendaya","is","my","queen","other guy","nobody","zendaya","is","my","queen"],roomId:"fwef98c09we-89w-efcab-aew-9gfw",rooms:[],isPlaying:!1,isUpdating:!1,settings:{isPrivate:!0,spyfall:{time:"8",gameType:"Locations"}}}:{isConnected:!1,selectedChoice:"",myIndex:-1,isLoadingRoom:!1,numPlayers:1,host:"",members:[],roomId:"",rooms:[],isPlaying:!1,isUpdating:!1,settings:{isPrivate:!0,spyfall:{time:"8",gameType:"Locations"}}};function A(e,t){switch(t.type){case"SET_SPYFALL_TIME":return Object.assign({},e,{settings:Object(b.a)(Object(b.a)({},e.settings),{},{spyfall:Object(b.a)(Object(b.a)({},e.settings.spyfall),{},{time:t.time})})});default:return e}}var D={time:0,spyfall:{selectedLocations:new Map,selectedNamesByIndex:new Set,spyIndex:0,locations:["a","b","c","d","e","f","g","h"],secretLocation:""}};var R=Object(v.b)({gameCredentials:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_GAME_USERNAME":return{username:t.username,gamename:t.gamename,userId:e.userId};case"RETURN_TO_GAME_SELECT":return{gamename:"",username:e.username,userId:e.userId};case"NAME_UPDATED":return Object(b.a)(Object(b.a)({},e),{},{username:t.username,gamename:t.gamename});default:return e}},gameData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.game){case"spyfall":return A(e,t)}switch(t.type){case"SET_IS_CONNECTED":return Object.assign({},e,{isConnected:t.isConnected});case"SET_IS_LOADING_ROOM_SELECTED_CHOICE":return Object.assign({},e,{isConnected:t.isConnected,selectedChoice:t.selectedChoice});case"SET_IS_LOADINGROOM":return Object.assign({},e,{isLoadingRoom:t.isLoadingRoom});case"SET_HOST_NAME":return Object.assign({},e,{host:t.host});case"ROOM_CREATED":var a=t.data,n=a.hostname,r=a.members,s=a.roomId;return Object.assign({},e,{host:n,members:r,roomId:s,myIndex:r.length-1,selectedChoice:T});case"ROOM_MEMBERS_UPDATED":var c=t.data,i=c.hostname,o=c.members,l=c.roomId;return Object.assign({},e,{host:i,members:o,roomId:l,myIndex:e.myIndex});case"ROOM_SETTINGS_UPDATED":var m=t.settings.settings;return Object.assign({},e,{settings:m,isUpdating:!1});case"SET_SETTINGS_IS_UPDATING":return Object.assign({},e,{isUpdating:!0});case"VISIBLE_ROOMS":return Object.assign({},e,{rooms:t.data.rooms,isLoadingRoom:!1});case"ROOM_JOINED":var u=t.data,d=u.hostname,p=u.members,E=u.roomId,h=u.settings;return Object.assign({},e,{host:d,members:p,roomId:E,myIndex:p.length-1,selectedChoice:C,settings:h});case"PLAYER_LEFT":var g=e.members,f=e.myIndex,y=t.index,v={myIndex:f,members:[]};return-1===y?(v.members=g.slice(1),v.myIndex-=1,-1===v.myIndex&&(v.selectedChoice=T),v.host=g[0]):(y<f&&(v.myIndex-=1),v.members=g.filter((function(e,t){return t!==y}))),Object.assign({},e,v);case"START_PLAYING":return Object.assign({},e,{isPlaying:!0});case"CLEAR_SPYFALL_BOARD":return Object.assign({},e,{isPlaying:!1});case"SET_IS_PRIVATE":return Object.assign({},e,{settings:Object(b.a)(Object(b.a)({},e.settings),{},{isPrivate:!e.settings.isPrivate})});case"CLEAR_ROOM_INFO":return Object.assign({},e,{isConnected:e.isConnected,selectedChoice:"",isLoadingRoom:!1,numPlayers:1,host:"",members:[],roomId:"",myIndex:-1,rooms:[],isPlaying:!1,isUpdating:!1,settings:{isPrivate:!0,spyfall:{time:"8",gameType:"Locations"}}});default:return e}},playState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_GAME_SPYFALL":return{time:t.gameState.time,spyfall:{spyIndex:t.gameState.spyIndex,selectedLocations:e.spyfall.selectedLocations,selectedNamesByIndex:e.spyfall.selectedNamesByIndex,locations:t.gameState.locations,secretLocation:t.gameState.secretLocation}};case"UDPATE_SPYFALL_TIME":return{time:t.time,spyfall:e.spyfall};case"ADD_NAME_SPYFALL":var a=e.spyfall.selectedNamesByIndex,n=new Set(a);return n.add(t.data),Object.assign({},e,{spyfall:Object(b.a)(Object(b.a)({},e.spyfall),{},{selectedNamesByIndex:n})});case"REMOVE_NAME_SPYFALL":var r=e.spyfall.selectedNamesByIndex,s=new Set(r);return s.delete(t.data),Object.assign({},e,{spyfall:Object(b.a)(Object(b.a)({},e.spyfall),{},{selectedNamesByIndex:s})});case"HANDLE_LOCATION_SPYFALL":var c=new Map(e.spyfall.selectedLocations),i=c.get(t.data);return i?c.set(t.data,(i+1)%3):c.set(t.data,1),Object.assign({},e,{spyfall:Object(b.a)(Object(b.a)({},e.spyfall),{},{selectedLocations:c})});case"CLEAR_SPYFALL_BOARD":return Object.assign({},e,{spyfall:{selectedLocations:new Map,selectedNamesByIndex:new Set,locations:[],spyIndex:0,secretLocation:""}});default:return e}}}),k={gameData:P,gameCredentials:I,playState:D},M=sessionStorage;var x=Object(v.c)(R,function(){var e=JSON.parse(M.getItem("gameData")),t=M.getItem("username"),a=M.getItem("gamename"),n=M.getItem("userId");if(!t||!a||!n)return k;var r={};return r.gameCredentials={username:t,gamename:a,userId:n},e&&e.isPlaying?r.gameData=e:r.gameData=P,r.playState=D,r}());function U(e){var t=e.gameCredentials,a=t.username,n=t.gamename,r=t.userId;M.setItem("username",a),M.setItem("gamename",n),M.setItem("userId",r)}var G=x,F=a(96),B=a.n(F);var Y=null,W=null;function H(){console.log("connecting...");var e=G.getState().gameCredentials,t=e.username,a=e.gamename,n=e.userId;W=n;var r="https://mohithefish.herokuapp.com/".concat(a);var s=B.a.connect(r,{reconnection:!0,reconnectionDelay:1e3,reconnectionDelayMax:5e3,reconnectionAttempts:10});"spyfall"===a&&function(e){e.on("timeUpdate",(function(e){G.dispatch(function(e){return{type:"UDPATE_SPYFALL_TIME",time:e}}(e))}))}(s),s.on("connect",(function(){console.log("The client connected"),Y=s,s.emit("initialConnection",{username:t,gamename:a,userId:W}),G.dispatch(w(!0))})),s.on("createdRoom",(function(e){G.dispatch({type:"ROOM_CREATED",data:{hostname:e.hostname,roomId:e.roomId,members:e.members,isPrivate:e.isPrivate}})})),s.on("nameUpdated",(function(e){var t,a=Object(p.a)(e,2),n=a[0],r=a[1];G.dispatch({type:"NAME_UPDATED",username:(t={username:n,gamename:r}).username,gamename:t.gamename})})),s.on("settingsUpdated",(function(e){G.dispatch(function(e){return{type:"ROOM_SETTINGS_UPDATED",settings:e}}({settings:e}))})),s.on("togglePrivate",(function(e){G.dispatch({type:"SET_IS_PRIVATE"})})),s.on("availableRooms",(function(e){G.dispatch({type:"VISIBLE_ROOMS",data:{rooms:e}})})),s.on("needId",(function(){console.log("you need an id to access this room!")})),s.on("youJoined",(function(e){G.dispatch({type:"ROOM_JOINED",data:{hostname:e.hostname,roomId:e.roomId,members:e.members,settings:e.settings}})})),s.on("othersJoined",(function(e){G.dispatch({type:"ROOM_MEMBERS_UPDATED",data:{hostname:e.hostname,roomId:e.roomId,members:e.members}})})),s.on("gameStarted",(function(e){G.dispatch(function(e){return{type:"START_GAME_SPYFALL",gameState:e}}(e)),G.dispatch({type:"START_PLAYING",isPlaying:!0})})),s.on("sentBackToLobby",(function(){"spyfall"===G.getState().gameCredentials.gamename&&G.dispatch({type:"CLEAR_SPYFALL_BOARD"})})),s.on("playerLeft",(function(e){G.dispatch(function(e){return{type:"PLAYER_LEFT",index:e}}(e))})),s.on("disconnect",(function(){Y=null,G.dispatch(w(!1))}))}function V(e){var t={time:e.time},a=G.getState().gameCredentials.gamename;return t[a]=e[a],t}function K(){if(!Y)throw new Error("Socket invalid!");G.dispatch({type:"SET_IS_LOADINGROOM",isLoadingRoom:!0}),Y.emit("getAvailableRooms",W)}function J(){if(!Y)throw new Error("Socket invalid!");Y.emit("ejectPlayerFromRoom",W)}function q(e){if(!Y)throw new Error("Socket invalid!");var t={targetRoom:e.trim(),userId:W};Y.emit("joinRoom",t)}function z(){if(!Y)throw new Error("Socket invalid!");Y.emit("startGame",W)}a(159);var $=["spyfall"];function Q(){var e=Object(n.useState)(G.getState().gameCredentials.username),t=Object(p.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)(""),i=Object(p.a)(c,2),l=i[0],m=i[1];Object(n.useEffect)((function(){document.title="Games"}),[]);var u,d=function(e){return e?[!1,""]:[!0,"Name cannot be empty."]}(a),E=Object(p.a)(d,2),h=E[0],g=E[1];return Boolean(l)&&!h?(G.getState().gameData.isConnected&&function(e){if(!Y)throw new Error("Socket invalid!");Y.emit("updateMyName",[W,e])}(a),G.dispatch({type:"SET_GAME_USERNAME",username:(u={username:a,gamename:l}).username,gamename:u.gamename}),U(G.getState()),r.a.createElement(o.a,{push:!0,to:"/games/".concat(l)})):r.a.createElement("div",{className:"games-page-wrapper"},r.a.createElement("h1",{className:"header"},"Games"),r.a.createElement("h3",{className:"input-message"},"Please create your username before continuing."),r.a.createElement("div",{className:"input"},r.a.createElement(y.a,{error:h,required:!0,id:"filled-required",label:"Required",variant:"filled",value:a,onChange:function(e){s(e.target.value)},helperText:g})),r.a.createElement("div",{className:"buttons-wrapper"},$.map((function(e){return r.a.createElement(f.a,{key:e,variant:"contained",color:"primary",disabled:h,onClick:function(){return m(e)}},e)}))))}a(160);var X=a(213),Z=a(54),ee=a.n(Z);a(161);function te(){!function(){if(!Y)throw new Error("Socket invalid!");Y.emit("returnToLobby",W)}()}var ae=function(){return r.a.createElement("div",{className:"backToLobby-wrapper"},r.a.createElement(X.a,{"aria-label":"go-back",color:"primary",onClick:te},r.a.createElement(ee.a,null)))};function ne(e){switch(e){case"Foods":return"food";default:return"location"}}var re=Object(l.b)((function(e){var t=e.gameData,a=e.playState,n=a.spyfall;return{gameCredentials:e.gameCredentials,time:a.time,gameType:t.settings.spyfall.gameType,isPlaying:t.isPlaying,selectedLocations:n.selectedLocations,selectedNamesByIndex:n.selectedNamesByIndex,isSpy:n.spyIndex===t.myIndex,locations:n.locations,secretLocation:n.secretLocation}}))((function(e){var t=e.gameCredentials,a=e.time,s=e.gameType,c=e.selectedLocations,i=e.selectedNamesByIndex,l=e.isSpy,m=e.locations,u=e.secretLocation,d=e.isPlaying,E=Object(n.useState)(function(){var e=G.getState().gameData;return{host:e.host,members:e.members,myIndex:e.myIndex}}()),h=Object(p.a)(E,1)[0],g=h.host,f=h.members,y=h.myIndex;if("false"===Object({NODE_ENV:"production",PUBLIC_URL:"/mohithefish",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_DESIGN&&!d)return r.a.createElement(o.a,{to:"/games/spyfall"});function v(e,t,a,n){var r=t.has(e),s=a,c="";return r&&(s=n,c="selected"),[c,function(t){return G.dispatch(s(e))}]}function b(e){G.dispatch({type:"HANDLE_LOCATION_SPYFALL",data:e.target.textContent})}var O=v(-1,i,L,j),S=Object(p.a)(O,2),I=S[0],N=S[1],_=-1===y?r.a.createElement("div",{className:"header-row"},r.a.createElement(ae,null),r.a.createElement("h1",null,"Play Spyfall")):r.a.createElement("div",{className:"header-row"},r.a.createElement("h1",null,"Play Spyfall"));return r.a.createElement("div",{className:"wrapper play-games-wrapper spyfall-page-wrapper"},r.a.createElement("div",{className:"header"},_,r.a.createElement("h4",null,"Your name is: ",t.username),l?r.a.createElement("h4",null,"You ARE the spy! ",r.a.createElement("span",{role:"img","aria-label":"spy emoji"},"\ud83d\udd75\ufe0f")," ",r.a.createElement("br",null)," Figure out the secret ",ne(s),"!"):r.a.createElement("h4",null,"You are NOT the spy. ",r.a.createElement("br",null)," The ",ne(s)," is ",r.a.createElement("span",{className:"secret-location"},u))),r.a.createElement("div",{className:"time-wrapper"},function(){var e=Math.floor(a/60),t=a%60;return r.a.createElement("h3",null,e,":",t.toString().padStart(2,"0"))}()),r.a.createElement("div",{className:"players-list"},r.a.createElement("h2",{className:"title"},"Players"),r.a.createElement("div",{className:"names"},r.a.createElement("h4",{key:g,className:I,onClick:N},g),f.map((function(e,t){var a=v(t,i,L,j),n=Object(p.a)(a,2),s=n[0],c=n[1];return r.a.createElement("h4",{key:"".concat(e).concat(t),className:s,onClick:c},e)})))),r.a.createElement("div",{className:"location-section"},r.a.createElement("h2",{className:"header"},s),r.a.createElement("div",{className:"location-wrapper"},m.map((function(e,t){var a=function(e){switch(c.get(e)){case 0:return"";case 1:return"accept";case 2:return"ignore";default:return""}}(e);return r.a.createElement("div",{key:e,className:"location vertically-center-text ".concat(a),onClick:b},r.a.createElement("p",null,e))})))))}));a(163),a(164);function se(){G.dispatch({type:"RETURN_TO_GAME_SELECT"})}var ce=function(){return r.a.createElement("div",{className:"backToLobby-wrapper"},r.a.createElement(X.a,{"aria-label":"go-back",color:"primary",onClick:se},r.a.createElement(ee.a,null)))},ie=a(214),oe=a(101),le=a.n(oe),me=a(176),ue=a(177),de=a(217),pe=a(173),Ee=a(100),he=a.n(Ee);function ge(){var e=Object(n.useState)(""),t=Object(p.a)(e,2),a=t[0],s=t[1];function c(){q(a)}return r.a.createElement(pe.a,{className:"form-wrapper",variant:"outlined"},r.a.createElement(ue.a,{htmlFor:"outlined-adornment-roomid"},"Room ID"),r.a.createElement(me.a,{id:"outlined-adornment-roomid",value:a,onChange:function(e){s(e.target.value)},onKeyPress:function(e){13!==e.which&&13!==e.keyCode||c()},endAdornment:r.a.createElement(de.a,{position:"end"},r.a.createElement(X.a,{children:r.a.createElement(he.a,null),onClick:c,onMouseDown:function(e){e.preventDefault()},edge:"end"})),labelWidth:70}))}var fe=Object(l.b)((function(e,t){var a=e.gameData.selectedChoice,n=e.gameData.isUpdatings;return Object(b.a)(Object(b.a)({},t),{},{selectedChoice:a,isUpdating:n})}),(function(e){return{setIsUpdating:function(){e({type:"SET_SETTINGS_IS_UPDATING"})}}}))((function(e){var t=e.settings,a=e.selectedChoice,n=e.isUpdating,s=e.setIsUpdating,c=e.isValid,i=a===N;return r.a.createElement(f.a,{disabled:!c||!i&&n,variant:"contained",onClick:function(){i?function(e){if(!Y)throw new Error("Socket invalid!");Y.emit("createRoom",[W,V(e)])}(G.getState().gameData.settings):(s(),function(e){if(!Y)throw new Error("Socket invalid!");Y.emit("updateSettings",[W,e])}(t))}},i?"Create":"Save")})),ye=a(218);a(165);var ve=Object(l.b)((function(e){return{isPrivate:e.gameData.settings.isPrivate}}),(function(e){return{handleSwitch:function(t){e({type:"SET_IS_PRIVATE"})}}}))((function(e){var t=e.isPrivate,a=e.handleSwitch;return r.a.createElement("div",{className:"setting"},r.a.createElement("h3",null,"Do you want a public or private room?"),r.a.createElement("div",{className:"switch-wrapper"},r.a.createElement("p",null,"Public"),r.a.createElement(ye.a,{checked:t,onChange:a,color:"primary",name:"checked",inputProps:{"aria-label":"primary checkbox"}}),r.a.createElement("p",null,"Private")),r.a.createElement("h6",null,"*At this time, this setting cannot be later changed."))})),be=a(211);function Oe(e){var t=e.children;return r.a.createElement("div",{className:"settings-item"},t)}function Se(e){var t=e.children;return r.a.createElement("div",{className:"item-name"},r.a.createElement("h3",null,t))}function Ie(e){var t=e.children;return r.a.createElement("div",{className:"item-value"},r.a.createElement("h3",null,t))}var Ne=Object(l.b)((function(e){var t=e.gameData.settings;return{time:t.spyfall.time,gameType:t.spyfall.gameType}}))((function(e){var t=e.time,a=e.gameType;return r.a.createElement("div",{className:"settings-list"},r.a.createElement(Oe,null,r.a.createElement(Se,null,"Time Length"),r.a.createElement(Ie,null,"".concat(t," minutes"))),r.a.createElement(Oe,null,r.a.createElement(Se,null,"Game Type"),r.a.createElement(Ie,null,a)))})),_e=a(174),Te=a(171),Ce=a(219),we=a(175);a(166);var Le=Object(l.b)((function(e,t){return Object(b.a)({},t)}))((function(e){var t=e.time,a=e.validTime,n=e.setTime,s=!a;return r.a.createElement("div",{className:"setting"},r.a.createElement("h3",null,"How long is the game?"),r.a.createElement(pe.a,{error:s},r.a.createElement(Te.a,{className:"time-input",id:"standard",label:"Time",value:t,onChange:function(e){n(e.target.value)},endAdornment:r.a.createElement(de.a,{position:"end"},"min")}),s?r.a.createElement(_e.a,{id:"component-error-text"},"Must be an integer less than ",100):""))}));var je=Object(l.b)((function(e,t){return Object(b.a)({},t)}))((function(e){var t=e.gameType,a=e.setGameType;return r.a.createElement("div",{className:"setting"},r.a.createElement("h3",null,"What category are the options?"),r.a.createElement(pe.a,null,r.a.createElement(we.a,{className:"game-type-input",value:t,onChange:function(e){a(e.target.value)},inputProps:{"aria-label":"Game Type"}},r.a.createElement(Ce.a,{value:"Locations"},"Locations"),r.a.createElement(Ce.a,{value:"Foods"},"Foods")),r.a.createElement(_e.a,null,"Game Type")))}));function Pe(e){var t=e.showPrivacy,a=e.isLobbyPrivate,s=Object(n.useState)(G.getState().gameData.settings.spyfall.time),c=Object(p.a)(s,2),i=c[0],o=c[1],l=Object(n.useState)(G.getState().gameData.settings.spyfall.gameType),m=Object(p.a)(l,2),u=m[0],d=m[1],E=function(e){return/^\d+$/.test(e)&&Number.parseInt(e)<100}(i),h={isPrivate:a,spyfall:{time:i,gameType:u}};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"settings-wrapper"},t?r.a.createElement(ve,null):"",r.a.createElement(Le,{time:i,setTime:o,validTime:E}),r.a.createElement(je,{gameType:u,setGameType:d})),r.a.createElement(fe,{isValid:E,settings:h}))}a(167);var Ae=Object(l.b)((function(e){return{isUpdating:e.gameData.isUpdating}}))((function(e){var t=e.canEdit,a=e.isUpdating,n=void 0,s=void 0;switch(G.getState().gameCredentials.gamename){case"spyfall":n=Pe,s=Ne;break;default:throw new Error("Not accepted game type")}return r.a.createElement(be.a,{className:"board-wrapper settings-board-wrapper"},r.a.createElement("div",{className:"settings-header"},r.a.createElement("h1",null,"Game Settings"),function(e,t){return t?e?r.a.createElement("h3",{className:"status"},"Updating..."):r.a.createElement("h3",{className:"status fade-out"},"Updated"):""}(a,t)),r.a.createElement("div",{className:"room-settings"},t?function(e,t){return r.a.createElement(e,{showPrivacy:t,isLobbyPrivate:G.getState().gameData.settings.isPrivate})}(n,!1):function(e){return r.a.createElement(e,null)}(s)))})),De=(a(168),r.a.createElement("ul",null,r.a.createElement("li",null,"The spy, at any time, can reveal they are a spy and try and guess the location. If they are correct, they win! Otherwise, the players win. "),r.a.createElement("li",null,"Additionally, at any time, or after the round end timer goes off, any member can accuse a player of being a spy. When this happens, a vote is made to see if every other player agrees with the accusation. When voting, each player may also give a reason for their vote, or any other statement they may like. In a mid-round vote every player must agree unanimously for the accusation to stand, at which point the player is revealed. If they are a spy, the team wins, if not, the spy wins. "),r.a.createElement("li",null,"If the game makes it to the end, the spy still may come forward before end-game voting is called to guess the location, at which point the same rules apply. Once the final bell rings and players are called to vote, however, it is too late for the spy to win by guessing the location. "),r.a.createElement("li",null,"At the end of the game, the player with the most votes is revealed, if they are a spy, the team wins. If they are not, the spy wins!")));function Re(){return r.a.createElement(be.a,{className:"board-wrapper rules-board-wrapper"},r.a.createElement("div",{className:"settings-header"},r.a.createElement("h1",null,"Rules")),De)}var ke=Object(l.b)((function(e){var t=e.gameData;return{username:e.gameCredentials.username,gamename:e.gameCredentials.gamename,host:t.host,selectedChoice:t.selectedChoice,isConnected:t.isConnected,isLoadingRoom:t.isLoadingRoom,members:t.members,roomId:t.roomId,myIndex:t.myIndex,rooms:t.rooms}}))((function(e){var t=e.isConnected,a=e.selectedChoice,n=e.host,s=e.roomId,c=e.members,i=e.myIndex,o=e.rooms,l=e.isLoadingRoom;if(!t||!a)return"";if(a===N)return r.a.createElement("div",{className:"room-settings"},r.a.createElement("div",{className:"settings-wrapper"},r.a.createElement(ve,null),r.a.createElement(fe,{isValid:!0})));if(a===_)return r.a.createElement("div",{className:"room-list"},r.a.createElement("div",{className:"input"},r.a.createElement("h4",null,"Enter the room id you would like to join:"),r.a.createElement(ge,null)),r.a.createElement("div",{className:"refresh-row"},r.a.createElement("h4",null,"Otherwise, click on one of the available rooms to join."),r.a.createElement(X.a,{color:"primary","aria-label":"refresh",onClick:K},r.a.createElement(le.a,null))),r.a.createElement(ie.a,{container:!0,spacing:3,className:"rooms-wrapper"},function(e,t){return t?r.a.createElement(E,null):0===e.length?r.a.createElement("h3",{className:"no-avail-rooms"},"Sorry. No other rooms were found at this time."):e.map((function(e){return r.a.createElement(ie.a,{item:!0,key:e.hostname,xs:12,className:"room"},r.a.createElement(f.a,{className:"data",onClick:function(){q(e.roomId)}},r.a.createElement("h3",{className:"left"},"Host: \xa0",r.a.createElement("span",{className:"bold"},e.hostname)),r.a.createElement("h3",{className:"right"},"Number of Players: \xa0",r.a.createElement("span",{className:"bold"},1+e.numPlayers))))}))}(o,l)));var m="",u=a===T;return u&&(m="my-name"),r.a.createElement("div",{className:"room-info"},r.a.createElement(Ae,{canEdit:u}),r.a.createElement("div",{className:"room-title"},r.a.createElement("h2",null,"Host: ",r.a.createElement("span",{className:m},n)),r.a.createElement("h2",null,"Room id: ",r.a.createElement("span",{className:"roomId",onClick:function(e){navigator.clipboard.writeText(s).then((function(){console.log("copied")}))}},s))),r.a.createElement(Re,null),function(e,t){return e?t>0?r.a.createElement(f.a,{variant:"contained",onClick:z,className:"host-control-panel"},"Play"):r.a.createElement("h4",{className:"ask-host"},"Invite friends to your lobby to start!"):r.a.createElement("h4",{className:"ask-host"},"Ask the host to start the game!")}(u,c.length),function(e,t){return 0===e.length?r.a.createElement("div",{className:"members"},r.a.createElement("h3",null,"Share your room id to let others join!")):r.a.createElement("div",{className:"members"},r.a.createElement("h3",{className:"others"},"Other players"),e.map((function(e,a){return r.a.createElement("h4",{className:a===t?"my-name":"",key:"".concat(e).concat(a)},e)})))}(c,i))}));function Me(e){e.className+=" disabled",e.variant="outlined"}var xe=Object(l.b)((function(e){var t=e.gameData;return{isConnected:t.isConnected,selectedChoice:t.selectedChoice}}),(function(e){return{handleSelect:function(t){t===N&&J(),t===_&&K(),e({type:"SET_IS_LOADING_ROOM_SELECTED_CHOICE",isConnected:!0,selectedChoice:t})}}}))((function(e){var t=e.isConnected,a=e.selectedChoice,n=e.handleSelect;if(!t)return r.a.createElement(E,null);var s={variant:"contained",className:"button",onClick:function(){return n(N)}},c={variant:"contained",className:"button",onClick:function(){return n(_)}};return a===N||a===T?(Me(c),delete s.onClick,s.disableRipple=!0):a!==_&&a!==C||(Me(s),delete c.onClick,c.disableRipple=!0),r.a.createElement("div",{className:"connected-choices"},r.a.createElement(f.a,Object.assign({color:"primary",disableElevation:!0},s),"Create Room"),r.a.createElement(f.a,Object.assign({color:"primary",disableElevation:!0},c),"Join Room"))})),Ue=sessionStorage;var Ge=Object(l.b)((function(e){var t=e.gameCredentials;return{gamename:t.gamename,username:t.username,isPlaying:e.gameData.isPlaying}}))((function(e){var t=e.gamename,a=e.username,s=e.isPlaying,c=e.location;return Object(n.useEffect)((function(){"true"!==Object({NODE_ENV:"production",PUBLIC_URL:"/mohithefish",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_DESIGN&&(G.getState().gameData.isConnected||H()),document.title="Waiting Room"}),[]),t?s?(Ue.setItem("gameData",JSON.stringify(G.getState().gameData)),r.a.createElement(o.a,{push:!0,to:"".concat(c.pathname,"/play")})):r.a.createElement("div",{className:"wrapper waiting-room-wrapper"},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"header-row"},r.a.createElement(ce,null),r.a.createElement("h1",null,"Play ",t)),r.a.createElement("h3",null,"Your name is: ",a)),r.a.createElement(xe,null),r.a.createElement(ke,{username:a})):(J(),G.dispatch({type:"CLEAR_ROOM_INFO"}),r.a.createElement(o.a,{to:"/games"}))})),Fe=(a(169),a(215)),Be=a(104),Ye=a(102),We=a.n(Ye),He=a(103),Ve=a.n(He),Ke=Object(Be.a)({palette:{primary:We.a,secondary:Ve.a},status:{danger:"orange"}});var Je=function(){return r.a.createElement(Fe.a,{theme:Ke},r.a.createElement(l.a,{store:G},r.a.createElement(i.a,{basename:"/"},r.a.createElement(o.d,null,r.a.createElement(o.b,{exact:!0,path:"/",component:g}),r.a.createElement(o.b,{path:"/testing",component:h}),r.a.createElement(o.b,{path:"/testcomponent",component:ae}),r.a.createElement(o.b,{path:"/games/spyfall/play",component:re}),r.a.createElement(o.b,{path:"/games/:name",component:Ge}),r.a.createElement(o.b,{path:"/games",component:Q}),r.a.createElement(o.b,null,r.a.createElement(o.a,{to:"/"}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Je,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[114,1,2]]]);
//# sourceMappingURL=main.7a96b66e.chunk.js.map