'use strict';var RESERVATION_TOAST_DURATION_SECONDS=3e3;$(document).ready(function(){$('#cancel-reservation-modal').modal(),$('#cancel-reservation').click(function(a){var b=$(a.target).data('reservation');$.post({url:'reservation/'+b.id+'/cancel',success:function success(c){c.success?Materialize.toast('Success! Your reservation was cancelled.',RESERVATION_TOAST_DURATION_SECONDS):Materialize.toast('Failed to cancel your reservation: '+c.error+'.',RESERVATION_TOAST_DURATION_SECONDS)},error:function error(){return Materialize.toast('Failed to cancel your reservation.',RESERVATION_TOAST_DURATION_SECONDS)},complete:function complete(){return $('.calendar[data-room-id="'+b.room+'"]').fullCalendar('refetchEvents')}})}),$('.calendar').each(function(a,b){var c=$(b).data('room-id');$(b).fullCalendar({defaultView:'agendaWeek',allDaySlot:!1,selectable:!0,eventOverlap:function eventOverlap(d){return d.canceled},selectOverlap:function selectOverlap(d){return d.cancelled},eventOrder:'-cancelled',timeFormat:'hh:mm A',contentHeight:'auto',editable:!0,header:{left:'today',center:'',right:'prev, next'},events:function events(d,e,f,g){$.get({url:'/reservations/'+c,data:{start:d.clone().startOf('week').unix(),end:e.unix()},success:function success(h){g(h.map(function(i){return i.editable=!i.cancelled,i.user===app.userId&&(i.color='green'),i.cancelled&&(i.color='gray'),app.admin&&(i.title=i.user),i}))}})},select:function select(d,e){$.post({url:'/reservation/add',data:{room:c,start:d.unix(),end:e.unix()},success:function success(f){f.success?Materialize.toast('Success! Your reservation has been made.',RESERVATION_TOAST_DURATION_SECONDS):Materialize.toast('Failed to create a reservation: '+f.error+'.',RESERVATION_TOAST_DURATION_SECONDS)},error:function error(){return Materialize.toast('Failed to create a reservation.',RESERVATION_TOAST_DURATION_SECONDS)},complete:function complete(){return $(b).fullCalendar('refetchEvents')}})},validRange:function validRange(d){return{start:d.clone().subtract(1,'days'),end:d.clone().add(app.CALENDAR_DAYS_INTO_FUTURE,'days')}},selectAllow:function selectAllow(d){return d.end.diff(d.start,'hours')<=app.MAXIMUM_DURATION_HOURS||app.admin},eventAllow:function eventAllow(d){return d.end.diff(d.start,'hours')<=app.MAXIMUM_DURATION_HOURS||app.admin},eventClick:function eventClick(d){!d.cancelled&&(d.user===app.userId||app.admin)&&($('#cancel-reservation-modal').modal('open'),$('#cancel-reservation-modal').find('#cancel-reservation').data('reservation',d))},eventDrop:function eventDrop(d){$.post({url:'reservation/'+d.id+'/edit',data:{room:c,start:d.start.unix(),end:d.end.unix()},success:function success(e){e.success?Materialize.toast('Success! Your reservation was edited.',RESERVATION_TOAST_DURATION_SECONDS):Materialize.toast('Failed to edit your reservation: '+e.error+'.',RESERVATION_TOAST_DURATION_SECONDS)},error:function error(){return Materialize.toast('Failed to edit your reservation.',RESERVATION_TOAST_DURATION_SECONDS)},complete:function complete(){return $('.calendar[data-room-id="'+d.room+'"]').fullCalendar('refetchEvents')}})},eventResize:function eventResize(d){$.post({url:'reservation/'+d.id+'/edit',data:{room:c,start:d.start.unix(),end:d.end.unix()},success:function success(e){e.success?Materialize.toast('Success! Your reservation was edited.',RESERVATION_TOAST_DURATION_SECONDS):Materialize.toast('Failed to edit your reservation: '+e.error+'.',RESERVATION_TOAST_DURATION_SECONDS)},error:function error(){return Materialize.toast('Failed to edit your reservation.',RESERVATION_TOAST_DURATION_SECONDS)},complete:function complete(){return $('.calendar[data-room-id="'+d.room+'"]').fullCalendar('refetchEvents')}})},eventRender:function eventRender(d,e){!d.cancelled&&(d.user===app.userId||app.admin)&&($(e).append($('<i class="material-icons tiny cancel-reservation-icon">delete</i>')),$(e).css('cursor','pointer'))},viewRender:function viewRender(){$('button',b).addClass('btn waves-effect waves-light red darken-4')}})})});
//# sourceMappingURL=reservations.js.map
