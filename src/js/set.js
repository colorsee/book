var color_l = [
	"#faf7ed",
	"#e6f2e6",
	"#e4f1f5",
	"#e0e0e0",
	"#f5e4e4",
	"#191b1c",
	"#52585c"
];
var color_txt = [
	"#000000",
	"#999999",
	"#666666",
	"#333333",
	"#111111",
	"#f1f1f1",
	"#f9f9f9"
];

$(document).ready(function() {
	$(".set_style_list .color_chose span,.phone_set_list .color").click(function() {
		console.log(color_l[col_idx])
		var col_idx = $(this).index();
		$(".book").css({
			"background-color": color_l[col_idx]
		});
		$(".bok_item_list p").css({
			"color": color_txt[col_idx]
		})
	});
	$(".set_style_list .r .lessen").click(function() {
		var size_txt = parseInt($(".set_style_list .r .now").text());
		size_txt < 12 ? 12 : size_txt--;
		$(".bok_item_list p").css({
			"font-size": size_txt + "px"
		});
		$(".set_style_list .r .now").text(size_txt);
	});
	$(".set_style_list .r .add").click(function() {
		var size_txt = parseInt($(".set_style_list .r .now").text());
		size_txt > 22 ? 22 : size_txt++;
		$(".bok_item_list p").css({
			"font-size": size_txt + "px"
		});
		$(".set_style_list .r .now").text(size_txt);
	});
	$(".set_style_list .r .but_cance,.set_style_list .r .but_sure").click(function() {
		$(".set_style").removeClass("act");
		$(".book_topl_but .bt_1").removeClass("bg_black");
	});
	$(".set_style_list .r .rad").click(function() {
		$(this).addClass("bg_red").siblings().removeClass("bg_red");
	});
	$(".set_style_list .read_h,.phone_set_list p .h").click(function() {
		$(".bok_item").addClass("scrol_none");
		$(".phone_page").show();
		$(".book_botomr").show();
	});
	$(".set_style_list .read_s,.phone_set_list p .s").click(function() {
		$(".bok_item").removeClass("scrol_none");
		$(".phone_page").hide();
		$(".book_botomr").hide();
	});
	//手机

	$('.phone_set_list input').bind("input", function(e) {
		$(this).attr('value', this.value);
		$(".bok_item_list p").css({
			"font-size": this.value + "px"
		});
		$(this).css('background', 'linear-gradient(to right, #FF3300, #FF3300, ' + (this.value - 12) * 10 + '%, #868686, #868686)');
	});
	$('.phone_speet_list input').bind("input", function(e) {
		$(this).attr('value', this.value);
		$(this).css('background', 'linear-gradient(to right, #FF3300, #FF3300, ' + this.value + '%, #868686, #868686)');
	});
	$(".bok_item .scrollview").click(function() {
		$(".phone_tool").fadeIn();
	});
	$(".phone_tool .rice span:nth-child(1)").click(function(e) {
		e.stopPropagation();
		$(this).toggleClass("color_y");
		if($(this).hasClass("color_y")) {
			alt_page("已加入标签")
		} else {
			alt_page("已取消标签")
		}
	});
	$(".phone_tool .rice span:nth-child(2)").click(function(e) {
		e.stopPropagation();
		alt_page("当前为第22章")
	});
});

$(window).on("load", function() {
	var this_val1 = $('.phone_speet_list input').val();
	var this_val2 = $('.phone_set_list input').val();
	$('.phone_speet_list input').css('background', 'linear-gradient(to right, #FF3300, #FF3300, ' + this_val1 + '%, #868686, #868686)');
	$('.phone_set_list input').css('background', 'linear-gradient(to right, #FF3300, #FF3300, ' + this_val2 + '%, #868686, #868686)');
});