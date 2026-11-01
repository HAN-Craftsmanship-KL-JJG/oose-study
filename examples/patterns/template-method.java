public abstract class Report {
    // The template method: it fixes the order of the steps.
    public final void generate() { // [!code highlight]
        fetchData();
        format();
        writeFooter();
    }

    protected abstract void fetchData();      // subclasses fill these in [!code highlight]
    protected abstract void format(); // [!code highlight]

    protected void writeFooter() {            // the same for every report
        System.out.println("-- end of report --");
    }
}

public class PdfReport extends Report {
    @Override
    protected void fetchData() { System.out.println("PDF: fetch the data"); }

    @Override
    protected void format() { System.out.println("PDF: lay out the pages"); }
}

public class HtmlReport extends Report {
    @Override
    protected void fetchData() { System.out.println("HTML: fetch the data"); }

    @Override
    protected void format() { System.out.println("HTML: make a table"); }
}

Report report = new PdfReport();
report.generate();
