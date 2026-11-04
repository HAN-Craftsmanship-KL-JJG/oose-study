class Report {
public:
    // The template method: it fixes the order of the steps.
    void generate() { // [!code highlight]
        fetchData();
        format();
        writeFooter();
    }

protected:
    virtual void fetchData() = 0;           // subclasses fill these in [!code highlight]
    virtual void format() = 0; // [!code highlight]

    void writeFooter() {                    // the same for every report
        std::cout << "-- end of report --\n";
    }
};

class PdfReport : public Report {
protected:
    void fetchData() override { std::cout << "PDF: fetch the data\n"; }
    void format() override { std::cout << "PDF: lay out the pages\n"; }
};

class HtmlReport : public Report {
protected:
    void fetchData() override { std::cout << "HTML: fetch the data\n"; }
    void format() override { std::cout << "HTML: make a table\n"; }
};

Report* report = new PdfReport();
report->generate();
