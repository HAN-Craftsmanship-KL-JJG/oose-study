class AnswerKey {
    [string] Answer([int]$question) { throw [System.NotImplementedException]::new("Answer") }
}

# The real object: it knows the answers.
class AnswerFile : AnswerKey {
    hidden [hashtable]$answers = @{ 1 = "B"; 2 = "D" }

    [string] Answer([int]$question) { return $this.answers[$question] }
}

# The proxy: the same interface, and it checks the access first.
class TeacherOnlyAnswerKey : AnswerKey { # [!code highlight]
    hidden [AnswerKey]$real
    hidden [bool]$teacher

    TeacherOnlyAnswerKey([AnswerKey]$real, [bool]$teacher) {
        $this.real = $real
        $this.teacher = $teacher
    }

    [string] Answer([int]$question) {
        if (-not $this.teacher) { return "No access" }   # the check
        # [!code highlight]
        return $this.real.Answer($question)              # pass the call on
    }
}

# The client only knows the interface.
[AnswerKey]$file = [AnswerFile]::new()
[AnswerKey]$forStudent = [TeacherOnlyAnswerKey]::new($file, $false)
[AnswerKey]$forTeacher = [TeacherOnlyAnswerKey]::new($file, $true)
$forStudent.Answer(1)      # No access
$forTeacher.Answer(1)      # B
