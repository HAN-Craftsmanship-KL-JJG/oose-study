class Report {
    # The template method: it fixes the order of the steps.
    [void] Generate() {
        $this.FetchData()
        $this.Format()
        $this.WriteFooter()
    }

    # Subclasses must override these two.
    [void] FetchData() { throw [System.NotImplementedException]::new("FetchData") }
    [void] Format() { throw [System.NotImplementedException]::new("Format") }

    [void] WriteFooter() {                  # the same for every report
        Write-Host "-- end of report --"
    }
}

class PdfReport : Report {
    [void] FetchData() { Write-Host "PDF: fetch the data" }
    [void] Format() { Write-Host "PDF: lay out the pages" }
}

class HtmlReport : Report {
    [void] FetchData() { Write-Host "HTML: fetch the data" }
    [void] Format() { Write-Host "HTML: make a table" }
}

[Report]$report = [PdfReport]::new()
$report.Generate()
