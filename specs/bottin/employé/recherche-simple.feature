# language: fr
@capacité @bottin @recherche
Fonctionnalité: Un employé recherche un autre employé

    Afin de communiquer avec une personne de l'organisation
    En tant qu'employé
    Je veux rechercher un autre employé

    Plan du scénario: Un employé recherche un employé par le nom

        Soit les employés suivants

        | Nom    | Prénom |
        | Claude | René   |
        | Demers | Claude |
        | Demers | Pierre |

        Quand un employé recherche '<nom>'
        Alors les personnes '<personnes>' devraient être listées dans les résultats

        Exemples:

        | nom    | personnes                    |
        | Claude | René Claude, Claude Demers   |
        | Demers | Claude Demers, Pierre Demers |
