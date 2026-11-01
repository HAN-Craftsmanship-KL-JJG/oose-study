class QuestionStorage {
    [void] Save([string]$id, [string]$text) {
        throw [System.NotImplementedException]::new("Save")
    }
    [string] Load([string]$id) { throw [System.NotImplementedException]::new("Load") }
}

# The real storage.
class FlatFileQuestionStorage : QuestionStorage {
    hidden [hashtable]$file = @{}           # stands in for a text file

    [void] Save([string]$id, [string]$text) { $this.file[$id] = $text }
    [string] Load([string]$id) { return $this.file[$id] }
}

# The proxy: the same interface, and it stands in front of the real object.
class EncryptingQuestionStorage : QuestionStorage { # [!code highlight]
    hidden [QuestionStorage]$real

    EncryptingQuestionStorage([QuestionStorage]$real) { $this.real = $real }

    [void] Save([string]$id, [string]$text) {
        # [!code highlight]
        $this.real.Save($id, $this.Encrypt($text))   # extra work, then pass the call on
    }

    [string] Load([string]$id) {
        return $this.Decrypt($this.real.Load($id))
    }

    # Base64 stands in for real encryption in this example.
    hidden [string] Encrypt([string]$t) {
        return [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($t))
    }
    hidden [string] Decrypt([string]$t) {
        return [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($t))
    }
}

# The client cannot tell the difference.
[QuestionStorage]$storage = [EncryptingQuestionStorage]::new([FlatFileQuestionStorage]::new())
$storage.Save("q1", "What is polymorphism?")
