<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CreateRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CreateRepository::class)]
#[ORM\Table(name: '`create`')]
#[ApiResource()]
class Create
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255)]
    private string $question;

    #[ORM\Column(type: 'string', length: 255)]
    private string $answer;

    #[ORM\Column(type: 'array')]
    private array $answersProposed = [];

    #[ORM\Column(type: 'array')]
    private $imageInfo = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getAnswer(): ?string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function getAnswersProposed(): ?array
    {
        return $this->answersProposed;
    }

    public function setAnswersProposed(array $answersProposed): self
    {
        $this->answersProposed = $answersProposed;

        return $this;
    }

    public function getImageInfo(): ?array
    {
        return $this->imageInfo;
    }

    public function setImageInfo(array $imageInfo): self
    {
        $this->imageInfo = $imageInfo;

        return $this;
    }

}