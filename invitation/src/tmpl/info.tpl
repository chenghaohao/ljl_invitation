<% if( data.code == "000000" ){ %>
<div class="color-1 js-animate animated" data-animate="bounceIn">各位亲朋好友:</div>
<div class="color-1 js-animate animated" data-animate="zoomIn">兹定于 <%= data.data.createTime+data.data.startTime%> 参加 <%= data.data.name%></div>
<div class="color-2 js-animate animated" data-animate="zoomInLeft">地点：<%= data.data.location%></div>
<div class="color-2 js-animate animated" data-animate="zoomInRight">邀请人：<%= data.data.inviter%></div>
<div class="rr mt-40 color-1 js-animate animated" data-animate="tossing">敬请光临</div>
<% } %>
