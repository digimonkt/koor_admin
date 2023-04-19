import React from "react";
import { Card, CardContent, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
const ManageUserRightsComponent = () => {
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "35px 30px 30px 30px",
            },
          }}
        >
          <div className="userright">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2>Koor user rights</h2>
              <div>
                <OutlinedButton
                  title={
                    <>
                      <SVG.EditIcon />
                      Edit
                    </>
                  }
                  sx={{
                    color: "#274593",
                    borderColor: "#274593",
                  }}
                ></OutlinedButton>
              </div>
            </Stack>
            <p>
              Koor (“we,” “our,” or “us”) is committed to protecting your
              privacy. This Privacy Policy explains how your personal
              information is collected, used, and disclosed by ViRViT. This
              Privacy Policy applies to our website, and its associated
              subdomains (collectively, our “Service”) alongside our
              application, ViRViT. By accessing or using our Service, you
              signify that you have read, understood, and agree to our
              collection, storage, use, and disclosure of your personal
              information as described in this Privacy Policy and our Terms of
              Service.
            </p>
            <h3>Definitions and key terms</h3>
            <p>
              Fermentum orci cum aliquam est, sed pharetra pretium. Vitae sit
              morbi urna pellentesque a eu vitae. Consequat pretium, elit
              faucibus vitae adipiscing habitasse in. Eu dui, consequat tempus
              turpis adipiscing quam bibendum nullam. Magna viverra tellus urna,
              accumsan molestie maecenas in amet sed. Id ac vulputate phasellus
              viverra cursus. Tellus in nisl nibh vel vitae. Nibh id dapibus
              nibh bibendum risus lobortis eros faucibus ipsum. Turpis felis
              vulputate netus nullam erat auctor. Id lacus praesent lectus
              accumsan mauris commodo quis purus. Nisl pharetra gravida non,
              purus mattis imperdiet odio pellentesque.
            </p>
            <p>
              Urna augue diam augue dui orci vitae at. Pretium ipsum laoreet sit
              nec, amet pharetra aliquet. Rutrum tincidunt pellentesque gravida
              varius arcu tristique est non. Et tellus nibh arcu massa purus
              gravida elementum nec.
            </p>
            <ul>
              <li>
                Viverra sed adipiscing ornare enim a vel. Id scelerisque sem
                volutpat pharetra, nisl odio. Posuere gravida egestas blandit
                faucibus vulputate fermentum, porta pulvinar sit. Massa sed
                morbi sem elementum faucibus mattis posuere dignissim.{" "}
              </li>
              <li>
                Libero turpis vel a egestas. Ornare nullam tincidunt volutpat
                malesuada arcu, leo quis orci blandit.{" "}
              </li>
              <li>
                Cursus egestas blandit tellus mauris ut elit sit porttitor.
                Egestas suscipit eu sed duis. Vitae in sed praesent arcu arcu
                ultricies. Eu magnis vitae eu lacus, lectus auctor.
              </li>
            </ul>
            <p>
              Fermentum orci cum aliquam est, sed pharetra pretium. Vitae sit
              morbi urna pellentesque a eu vitae. Consequat pretium, elit
              faucibus vitae adipiscing habitasse in. Eu dui, consequat tempus
              turpis adipiscing quam bibendum nullam. Magna viverra tellus urna,
              accumsan molestie maecenas in amet sed. Id ac vulputate phasellus
              viverra cursus. Tellus in nisl nibh vel vitae. Nibh id dapibus
              nibh bibendum risus lobortis eros faucibus ipsum. Turpis felis
              vulputate netus nullam erat auctor. Id lacus praesent lectus
              accumsan mauris commodo quis purus. Nisl pharetra gravida non,
              purus mattis imperdiet odio pellentesque.
            </p>
            <h3>Definitions and key terms</h3>
            <p>
              Proin lectus porta interdum nulla vulputate sapien nullam ac
              aliquet. Cursus amet sit in congue lobortis at. Lorem eu cursus
              accumsan blandit dui viverra. Ullamcorper eleifend id ac volutpat
              turpis aliquet at consequat, ac. Gravida lectus vel scelerisque
              scelerisque mauris id nulla. Mattis congue at in id tellus. Dui
              purus facilisis et urna, quis imperdiet enim. Dolor faucibus nec
              faucibus enim, natoque pharetra. Vitae nec sit nec ante. Diam non
              hendrerit turpis faucibus risus. Tincidunt molestie eu eget et
              quam nullam faucibus fermentum. Vel urna nulla volutpat vitae
              imperdiet quis placerat. Risus neque massa libero, vitae in. Sed
              duis blandit mi lectus id fames sit in. Enim vulputate proin
              posuere tristique ut. Habitant a dictum egestas urna risus
              tristique pulvinar adipiscing. Libero integer libero, feugiat
              dignissim id nunc. Purus eu nec nullam lectus lacinia mauris.
              Etiam in bibendum eu auctor in non risus. Velit, ultrices tellus
              dolor nisl vestibulum ut cursus cras ultricies. Vestibulum, vitae
              non elementum mattis. Vitae consectetur at venenatis vitae netus
              odio tristique aliquet. Sed nunc, at mauris nulla egestas euismod
              purus. Volutpat feugiat quis vitae commodo habitant nec ut. Tempor
              dui consectetur convallis elit integer laoreet consequat. Massa
              amet tempor habitant etiam. Gravida dis eu faucibus est semper
              donec. Lacus potenti porttitor pulvinar morbi duis ut. Donec
              viverra vitae sit massa. Sapien nibh arcu enim ut tortor
              consectetur leo malesuada. Diam pulvinar velit orci nulla
              tristique leo, eget urna nisi.{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageUserRightsComponent;
