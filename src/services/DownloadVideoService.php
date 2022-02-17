<?php

namespace App\Services;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\HttpFoundation\Request;

    class DownloadVideoService {

        private HttpClientInterface $reactClient;

        public function __construct(HttpClientInteface $reactClient) {
            $this->reactClient = $reactClient;
        }

        public function callApi(Request $req) {
            $videoUrl = json_decode($req->getContent(), true);
            return $this->uploadVideoToServer($videoUrl["imageName"]);
        }

        private function uploadVideoToServer($clientUrl) {
            $fullName = md5(uniqid()) . '.mp4';
            file_put_contents("files/" . $fullName, file_get_contents($clientUrl));
            return 'le fichier est envoyé sur le serveur mec';
        }

    }
?>