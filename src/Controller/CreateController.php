<?php

namespace App\Controller;

use App\Repository\CreateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CreateController extends AbstractController
{
    public function __invoke(CreateRepostiory $CreateRepostiory, Request $req, NormalizerInterface $normalizer): JsonResponse
    {
        $videoUrl = json_decode($req->getContent(), true);
        $entries = $videoUrl['rows'];
        $normalized = $normalizer->normalize($CreateRepostiory->getQuestions(4), 'array');
        return new JsonResponse($normalized);
    }
}