<script>

$(document).ready(function(){
  $(window).scroll(function(){
    if ($(document).scrollTop() > 50) {
      $('.navbar-fixed-top').addClass('shrink');
    } else {
      $('.navbar-fixed-top').removeClass('shrink');
    }
  });
});

</script>
