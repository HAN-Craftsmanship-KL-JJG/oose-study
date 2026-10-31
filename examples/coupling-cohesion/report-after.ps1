class GradeCalculator {
    [double] CalculateAverage([double[]]$grades) {
        return ($grades | Measure-Object -Average).Average
    }
}

class ReportMailer {
    [void] Send([object]$report, [string]$address) { }
}

class ReportStorage {
    [void] Save([object]$report) { }
}
