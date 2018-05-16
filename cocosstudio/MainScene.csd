<GameFile>
  <PropertyGroup Name="MainScene" Type="Scene" ID="a2ee0952-26b5-49ae-8bf9-4f1d6279b798" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="240" Speed="1.0000">
        <Timeline ActionTag="1961810047" Property="ActionValue">
          <InnerActionFrame FrameIndex="0" Tween="False" InnerActionType="SingleFrame" CurrentAniamtionName="-- ALL --" SingleFrameIndex="0" />
          <InnerActionFrame FrameIndex="240" Tween="False" InnerActionType="SingleFrame" CurrentAniamtionName="-- ALL --" SingleFrameIndex="0" />
        </Timeline>
        <Timeline ActionTag="1961810047" Property="Position">
          <PointFrame FrameIndex="0" Tween="False" X="-3.7147" Y="414.0989" />
          <PointFrame FrameIndex="240" X="74.2772" Y="123.4868">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="1961810047" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="240" X="0.2500" Y="0.2500">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1961810047" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="240" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
      </Animation>
      <AnimationList>
        <AnimationInfo Name="Shrink" StartIndex="0" EndIndex="240">
          <RenderColor A="255" R="255" G="105" B="180" />
        </AnimationInfo>
      </AnimationList>
      <ObjectData Name="Scene" ctype="GameNodeObjectData">
        <Size X="960.0000" Y="640.0000" />
        <Children>
          <AbstractNodeData Name="Background" CanEdit="False" ActionTag="953446860" Tag="5" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="TopEdge" ctype="SpriteObjectData">
            <Size X="960.0000" Y="640.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="Images/HelloWorld.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="Move" ActionTag="62426662" Tag="20" IconVisible="False" LeftMargin="717.6018" RightMargin="196.3982" TopMargin="119.6446" BottomMargin="484.3554" TouchEnable="True" FontSize="14" ButtonText="Button" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="16" Scale9Height="14" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="46.0000" Y="36.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="740.6018" Y="502.3554" />
            <Scale ScaleX="1.3043" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.7715" Y="0.7849" />
            <PreSize X="0.0479" Y="0.0562" />
            <TextColor A="255" R="65" G="65" B="70" />
            <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
            <PressedFileData Type="Default" Path="Default/Button_Press.png" Plist="" />
            <NormalFileData Type="Default" Path="Default/Button_Normal.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="Cat" ActionTag="1961810047" Tag="30" IconVisible="True" LeftMargin="-3.7147" RightMargin="963.7147" TopMargin="225.9011" BottomMargin="414.0989" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
            <Size X="0.0000" Y="0.0000" />
            <AnchorPoint />
            <Position X="-3.7147" Y="414.0989" />
            <Scale ScaleX="0.8062" ScaleY="0.8062" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="-0.0039" Y="0.6470" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="Cat.csd" Plist="" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>