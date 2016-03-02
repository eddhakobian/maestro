<?php
session_start();
    $client_id = '5328876'; // ID приложения
    $client_secret = 'qdXG2I3i9D5FZ2H57bY6'; // Защищённый ключ
    $redirect_uri = 'http://localhost/maestro/login.php'; // Адрес сайта

    $url = 'http://oauth.vk.com/authorize';

    $params = array(
        'client_id'     => $client_id,
        'redirect_uri'  => $redirect_uri,
        'display'  => 'page',
        'scope'  => 'friends,audio',
        'response_type' => 'code'
    );

    $link = $url . '?' . urldecode(http_build_query($params));

if (isset($_GET['code'])) {
    $result = false;
    $params = array(
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'redirect_uri' => $redirect_uri,
        'code' => $_GET['code']
    );

    $token = json_decode(file_get_contents('https://oauth.vk.com/access_token' . '?' . urldecode(http_build_query($params))), true);

    if (isset($token['access_token'])) {
        $params = array(
            'uids'         => $token['user_id'],
            'fields'       => 'uid,first_name,last_name,photo_50',
            'access_token' => $token['access_token']
        );

        $userInfo = json_decode(file_get_contents('https://api.vk.com/method/users.get' . '?' . urldecode(http_build_query($params))), true);
        if (isset($userInfo['response'][0]['uid'])) {
            $userInfo = $userInfo['response'][0];
            $result = true;
        }
    }

    if ($result) {
        $_SESSION['vk_id'] = $userInfo['uid'];
        $_SESSION['vk_name'] = $userInfo['first_name'].' '.$userInfo['last_name'];
        $_SESSION['vk_photo'] = $userInfo['photo_50'];
        $_SESSION['access_token'] = $token['access_token'];
        $conn = mysql_connect('localhost','root','');
        if($conn != false){
            mysql_select_db('maestro');
            $checkIfExists = mysql_query('select * from users where vk_id='.$userInfo['uid'].';');
            while($row = mysql_fetch_array($checkIfExists)){
                if($row['vk_id'] == $userInfo['uid']){
                    $alreadyLogged = true;
                    break;
                }
            }
            if(!isset($alreadyLogged)){
                mysql_query("insert into users (vk_id,first_name,last_name,photo) values ('".$userInfo['uid']."','".$userInfo['first_name']."','".$userInfo['last_name']."','".$userInfo['photo_50']."');");
            }
        }
        header("Location: index.php");
    }
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Sign in</title>
	<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<a id="log_butt" href="<?php echo $link;?>">Sign in</a>
</body>
</html>