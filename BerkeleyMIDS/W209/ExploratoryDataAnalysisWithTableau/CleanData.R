wd <- 'E:/Education/Berkeley Masters/W209/Homework2'
setwd(wd)

dating.df <- read.csv('./data/Dating.csv')

#
# Determine if a person can access the internet. This means answering true to
# any of the following: 'use internet', 'use email', 'use social networking'
#
dating.df$online <- dating.df$use_internet == "Yes" |
                    dating.df$use_email == "Yes" |
                    dating.df$use_social_networking == "Yes"

#
# Assume data is wrong if person has more than 10 children. Set to 0 children.
#
dating.df$children0_5 <- ifelse(dating.df$children0_5 > 10, 0, dating.df$children0_5)
dating.df$children6_11 <- ifelse(dating.df$children6_11 > 10, 0, dating.df$children6_11)
dating.df$children12_17 <- ifelse(dating.df$children12_17 > 10, 0, dating.df$children12_17)

#
# Calculate total children
#
dating.df$totalchildren <- ifelse(!is.na(dating.df$children0_5) & !is.na(dating.df$children6_11) & !is.na(dating.df$children12_17), dating.df$children0_5+dating.df$children6_11+dating.df$children12_17, 0)

#
# Calculate income with outliers set to a limit of 20
#
dating.df$incomelimit <- ifelse(dating.df$income > 20, 20, dating.df$income)

write.table(dating.df, file ='Dating2.csv', quote = FALSE, sep=',', row.names = FALSE)
