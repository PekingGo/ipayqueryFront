<template>
	<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">input（输入框）</h1>
		</header>
		<div class="mui-content">
			<div class="mui-content-padded" style="margin: 5px;">
				<h5>默认搜索框：</h5>
				<div class="mui-input-row mui-search">
					<input type="search" class="mui-input-clear" placeholder="">
				</div>
				<h5 class="mui-plus-visible">语音输入搜索框：</h5>
				<div class="mui-input-row mui-search mui-plus-visible">
					<input id="search" type="search" class="mui-input-speech mui-input-clear" placeholder="带语音输入的搜索框">
				</div>
				<h5>密码框：</h5>
				<div class="mui-input-row mui-password">
					<input type="password" class="mui-input-password">
				</div>
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label>Input</label>
						<input type="text" placeholder="普通输入框">
					</div>
					<div class="mui-input-row">
						<label>Input</label>
						<input type="text" class="mui-input-clear" placeholder="带清除按钮的输入框">
					</div>

					<div class="mui-input-row mui-plus-visible">
						<label>Input</label>
						<input type="text" class="mui-input-speech mui-input-clear" placeholder="语音输入">
					</div>
					<div class="mui-button-row">
						<button type="button" class="mui-btn mui-btn-primary" onclick="return false;">确认</button>&nbsp;&nbsp;
						<button type="button" class="mui-btn mui-btn-danger" onclick="return false;">取消</button>
					</div>
				</form>
				<div class="mui-input-row" style="margin: 10px 5px;">
					<textarea id="textarea" rows="5" placeholder="多行文本框"></textarea>
				</div>
			</div>
		</div>
</template>

<script>
</script>

<style>
</style>