<% if( data.code == "000000" ){ %>
<div class="page4-date color-2 js-animate animated" data-animate="rotateInDownRight">时间：<%= data.data.startTime%></div>
<div class="page4-address color-2 js-animate animated" data-animate="rotateInDownLeft">地点：<%= data.data.location%></div>
<div class="page4-time color-2 js-animate animated" data-animate="rotateInDownRight">开席时间：<%= data.data.cTime%></div>
<div class="page4-times color-2 js-animate animated" data-animate="rotateInDownLeft">酒席场数：<%= data.data.times%></div>
<div class="page4-times color-2 js-animate animated" data-animate="rotateInDownRight">邀请人：<%= data.data.inviter%></div>
<% } %>
