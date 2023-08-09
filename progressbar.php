<?php
if(isset($_GET['players']) && !empty($_GET['players'])){
	if(isset($_GET['maxplayers']) && !empty($_GET['maxplayers'])){
		$width = 400;
		$height = 20;
		$progress = $_GET['players'] / $_GET['maxplayers'];

		$image = imagecreatetruecolor($width, $height);

		$bgColor = imagecolorallocate($image, 240, 240, 240);
		$borderColor = imagecolorallocate($image, 200, 200, 200);
		$progressColor = imagecolorallocate($image, 52, 152, 219);

		imagefilledrectangle($image, 0, 0, $width, $height, $bgColor);

		$progressWidth = intval(($width - 2) * $progress);
		imagefilledrectangle($image, 1, 1, $progressWidth + 1, $height - 1, $progressColor);

		imagerectangle($image, 0, 0, $width - 1, $height - 1, $borderColor);

		header('Content-Type: image/png');

		imagepng($image);

		imagedestroy($image);
	}
}
?>