---
title: "Flowchart to My Heart"
date: 2009-07-07
author: "Chris Coyne"
source: "http://blog.okcupid.com/index.php/flowchart-to-my-heart/"
archive: "https://web.archive.org/web/20100725063756id_/http://blog.okcupid.com/index.php/flowchart-to-my-heart/"
---
OkCupid describes a tool that converted a user's mandatory match questions into a printable dating flowchart. Each branch represented an accepted or rejected answer.

## Key findings

- Users selected which questions were mandatory.
- Accepted partner answers created explicit branches.
- The result made each user's personal decision rules visible.

## Flowchart reconstruction

The following Mermaid diagram is a paraphrased reconstruction of Chris Coyne's example PDF. It preserves the decision paths but shortens the labels for readability. It represents one user's mandatory filters. It does not represent OkCupid's global question order.

```mermaid
flowchart TD
    Start(["Would I date you?"])
    Religion["Does your duty to God or religion<br/>come before your family?"]
    Abortion["Would abortion be an option<br/>after an unintended pregnancy?"]
    School["Should public schools teach<br/>evolution and creationism together?"]
    WaitForSex["How do you view waiting until marriage for sex?"]
    Apple["An apple rises 50%, then falls 50%,<br/>and now costs $0.75. What was its first price?"]
    Relationship["Are you married, engaged, or in a relationship<br/>that you expect to end in marriage?"]
    Evolution["Did humans evolve from primates?"]
    Bathing["How often do you bathe or shower?"]
    Flag["Should it be illegal to burn your national flag?"]
    Smoking["Are you disgusted by smoking?"]
    Cats["Would you own a cat?"]
    Marriage["Must two loving parents be married?"]
    Logic["Do highly logical people annoy you?"]
    Victimless["Should people go to jail for victimless acts,<br/>such as drug use, consensual sex work,<br/>assisted suicide, or consensual BDSM?"]
    Homosexuality["Is being homosexual sinful?"]

    NoDate(["NO DATE"])
    Success(["SUCCESS<br/>LET'S DO IT"])
    Paying(["ONLY IF YOU'RE<br/>PAYING"])

    Start --> Religion
    Religion -->|Yes| Abortion
    Religion -->|No| School

    Abortion -->|Yes| WaitForSex
    Abortion -->|No| NoDate

    School -->|"Teach both OR exclude evolution"| WaitForSex
    School -->|"Exclude creationism"| Apple

    WaitForSex -->|Ridiculous| Relationship
    WaitForSex -->|Acceptable| NoDate

    Apple -->|"$0.75, $1.25, or $0.50"| Relationship
    Apple -->|"$1.00"| Evolution

    Relationship -->|Yes| Bathing
    Relationship -->|No| NoDate

    Evolution -->|Yes| Flag
    Evolution -->|"No or Unsure"| Bathing

    Bathing -->|"Daily or most days"| Smoking
    Bathing -->|"Several times weekly or less"| NoDate

    Flag -->|Yes| Smoking
    Flag -->|No| Cats

    Smoking -->|Yes| Marriage
    Smoking -->|No| NoDate

    Cats -->|"Yes, gladly"| Marriage
    Cats -->|"Indifferent, dislike, or allergic"| Logic

    Marriage -->|No| Victimless
    Marriage -->|Yes| NoDate

    Logic -->|Yes| Victimless
    Logic -->|No| Homosexuality

    Victimless -->|"Yes, some, or unsure"| NoDate
    Victimless -->|No| Paying

    Homosexuality -->|Yes| NoDate
    Homosexuality -->|No| Success

    classDef question fill:#f8f9fa,stroke:#495057,color:#212529,stroke-width:1.5px
    classDef reject fill:#cf3030,stroke:#8b1a1a,color:#ffffff,stroke-width:2px
    classDef accept fill:#8af58a,stroke:#2e7d32,color:#102010,stroke-width:2px
    classDef conditional fill:#fff52b,stroke:#8a8200,color:#242000,stroke-width:2px

    class Religion,Abortion,School,WaitForSex,Apple,Relationship,Evolution,Bathing,Flag,Smoking,Cats,Marriage,Logic,Victimless,Homosexuality question
    class NoDate reject
    class Success accept
    class Paying conditional
```

## Algorithm relevance

The flowchart is a direct illustration of asymmetric matching. A user can accept several partner answers even when their own answer is different.

## Sources

- [Chris Coyne's original flowchart PDF](https://web.archive.org/web/20100331172158/http://cdn.okcimg.com/blog/flowchart_to_my_heart/chris.pdf)
- [Archived OkTrends article](https://web.archive.org/web/20100725063756id_/http://blog.okcupid.com/index.php/flowchart-to-my-heart/)
- [Original OkTrends URL](http://blog.okcupid.com/index.php/flowchart-to-my-heart/)
