class Question {
    [int] Points() { throw [System.NotImplementedException]::new("Points") }
}

# Two normal question types.
class OpenQuestion : Question {
    [int] Points() { return 3 }
}

class MultipleChoiceQuestion : Question {
    [int] Points() { return 1 }
}

# The decorator: the same interface, and it wraps another Question.
class SourceBonus : Question { # [!code highlight]
    hidden [Question]$question              # the wrapped question

    SourceBonus([Question]$question) { $this.question = $question }

    [int] Points() {
        return $this.question.Points() + 2  # pass the call on, then add something [!code highlight]
    }
}

# Decorators can wrap each other, like layers of an onion.
class TimeBonus : Question {
    hidden [Question]$question

    TimeBonus([Question]$question) { $this.question = $question }

    [int] Points() {
        return $this.question.Points() * 2
    }
}

$q1 = [OpenQuestion]::new()                                         # 3 points
$q2 = [SourceBonus]::new([OpenQuestion]::new())                     # 3 + 2 = 5 points
$q3 = [TimeBonus]::new([SourceBonus]::new([MultipleChoiceQuestion]::new()))   # (1 + 2) * 2 = 6
$q3.Points()
